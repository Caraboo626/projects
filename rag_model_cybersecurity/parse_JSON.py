import re
import json
import os
import torch
from transformers import DistilBertModel, DistilBertTokenizer

"""
The following code performs the following formatting updates to all 
cluster JSON files taken from MISP's GitHub repository.

This script was created to match the format of MISP's JSON schema. 

NOTE: This script must be next to the 'clusters' folder in order
run correctly.

1. Removes any unnecessary keys
2. Renames keys per formatting requirements
3. Deletes null values
4. Merges all important information together within the 'text' key.
5. Adds embeddings for RAG-LLM utilization

Embedding Model Used: distilbert-based-uncased

"""

# As a note, generate_embeddings function was written by a different member of the AntDefense team
# generating embeddings of text
def generate_embeddings(texts):
    print("generating embeddings")

    # using distilbert to embedded the texts
    tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
    model = DistilBertModel.from_pretrained('distilbert-base-uncased')

    # holds the embeddings
    embeddings = []

    # embedding process
    for text in texts:
        inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)
        with torch.no_grad():
            outputs = model(**inputs)
        cls_embedding = outputs.last_hidden_state[:, 0, :].squeeze().tolist()
        embeddings.append(cls_embedding)

    return embeddings


def find_and_replace_key_names(directory, json_file, replacements):
    json.encoder.c_make_encoder = None

    #read the JSON file and parse its content into a Python dictionary
    with open(os.path.join(directory, json_file), 'rb') as f:
        data = json.load(f)

    #goes through entire JSON file and recursively replaces necessary keys
    recursive_replace_keys(data, replacements)

    #recursively removes null objects and values
    data = remove_null_values(data)

    updated_json = json.dumps(data, indent=4)

    # Write the JSON string back into the JSON file
    with open(json_file, 'w') as f:
        f.write(updated_json)

    merge_json_values(data, data['values'])
    data = data['values']

    # Convert the modified dictionary back into a JSON string
    updated_json = json.dumps(data, indent=4)

    # Write the JSON string back into the JSON file
    with open(json_file, 'w') as f:
        f.write(updated_json)


def recursive_replace_keys(data, replacements):
    # detects if contents are a list
    if isinstance(data, list):
        # recursively checks contents of list for keys
        for i in range(len(data)):
            recursive_replace_keys(data[i], replacements)
    # detects if contents are a dictionary
    if isinstance(data, dict):
        # makes a copy of the data and searches through the keys and values
        for key, value in data.copy().items():
            # deletes unneeded keys
            if (key == 'category') | (key == 'source') | (key == 'uuid') | (key == 'external_id') | (
                    key == 'kill_chain') | (key == 'external_id') | (key == 'version') | (key == 'dest-uuid') | (
                    key == 'related'):
                del data[key]
                continue
            # recursive call
            recursive_replace_keys(data[key], replacements)
            # searches through replacement key list
            for old_key, replacement_key in replacements.items():
                # Create a new key-value pair in the dictionary with the new key name and the value of the old key
                if key == old_key:
                    data[replacement_key] = data[key]
                    # Delete the old key from the dictionary
                    del data[key]
                    break

def merge_json_values(data, data_level):
    # cycle through data
        # if keys are not one of the chosen keys
            # move them to text key
    paragraph = ""
    if isinstance(data, list):
        for i in range(len(data)):
            merge_json_values(data[i], data)
    if isinstance(data, dict):
        print("merging values")
        for key, value in data.copy().items():
            # recursive call
            merge_json_values(data[key], data)
            if key == 'url':
                move_url_data = {key: value}
                data_level.update(move_url_data)
                data.pop('url')
            if key == 'meta':
                if 'text' in data:
                    data['text'] += str(data['meta'])
                else:
                    data['text'] = str(data['meta'])
                del data['meta']
                cleaned_texts = clean_text(data['text'])
                paragraph = paragraph + " " + cleaned_texts
                print("paragraph: ", paragraph)
                if paragraph:
                    print("matched paragraph: ", paragraph)
                    embeds = generate_embeddings(paragraph)[0]
                    new_embeddings = {'embedding': embeds}
                    data.update(new_embeddings)

def clean_text(text):
    text = re.sub(r'[^A-Za-z0-9 ]+', '', text)
    # remove unicode non-breaking space character
    text = re.sub(r'\xa0', ' ', text)
    return text

#FIXED
def remove_null_values(data):
    # if list, recursively remove null values
    if isinstance(data, list):
        return [val for val in map(remove_null_values, data) if val]
    if isinstance(data, dict):
        # if dictionary, perform same action but with different syntax
        return {
            key: val
            for key, val in ((key, remove_null_values(val)) for key, val in data.items())
            if val
        }
    else:
        return data


def main():
    replacements = {
        "refs": "url",
        "value": "title",
        "description": "text",
        "type": "tag"
    }
    directory = 'clusters_need_extra_embedding'
    for filename in os.listdir(directory):
        print(filename)
        find_and_replace_key_names(directory, filename, replacements)

if __name__ == '__main__':
    main()