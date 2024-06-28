import os
import csv
from dotenv import load_dotenv
from transformers import DistilBertTokenizer, DistilBertModel
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.chains import RetrievalQA
from langchain_community.llms import HuggingFaceEndpoint
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate
from langchain_mongodb import MongoDBAtlasVectorSearch
from pymongo import MongoClient

"""
This RAG model utilizes the following language models
Embeddings: distilbert-base-uncased
Text Generation: zephyr-7b-beta

Note: to implement this code, please create a keys file 
in the same directory that stores access to your MongoDB
instance and the HuggingFace token. 

"""

load_dotenv()
# Insert your API
os.environ["HUGGINGFACEHUB_API_TOKEN"] = os.getenv('HF_TOKEN')
historyfile = "history.csv"

#Access to Mongo DB and initialize the distilbert model
client = MongoClient(os.getenv('uri'))
tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
model = DistilBertModel.from_pretrained('distilbert-base-uncased')

#MongoDB database information
db_name = "Cipher-API"
collection_name = "MISP_data"
collection = client[db_name][collection_name]

#Using the embeddings from distilbert and access to MongoDB vector index
embeddings = HuggingFaceEmbeddings(model_name='distilbert-base-uncased')
vector_index_name = "misp_data_index"
vector_embedding_field_name = "embedding"
text_field_name = "text"

#Creates vector store to access the collection and data and their embeddings
vectorStore = MongoDBAtlasVectorSearch(collection=collection, embedding=embeddings, index_name=vector_index_name, embedding_key=vector_embedding_field_name, text_key=text_field_name)

#Callbacks support token-wise streaming and handle output
callback_manager = CallbackManager([StreamingStdOutCallbackHandler()])

#Text generation - keep verbose in to make sure callback_manager works
llm = HuggingFaceEndpoint(
    repo_id="HuggingFaceH4/zephyr-7b-beta",
    temperature=1.00,
    max_tokens=1024,
    top_k=30,
    repetition_penalty=1.1,
    callback_manager=callback_manager,
    verbose=True,
)

#Retrieves the data from the vector store
retriever = vectorStore.as_retriever(search_kwargs={"k": 1})

def clear_file():
    with open(historyfile, "w+") as file:
        file.truncate(0)

def convo_history(query, response):
    with open(historyfile, 'a', newline="") as file:
        csvwriter = csv.writer(file, delimiter="~")
        csvwriter.writerow([query, response])
        file.close()

def get_template(query):

    name = "Joshua"
    print("\n")
    print("User Query: \"" + query + "\"")
    print("\n")

    template = f"""
        
        Name: {name}
        <|system|>You are a cybersecurity expert. You name is {name} and you only answer questions about cybersecurity.  
        If the {query} is not related to cybersecurity, say you do not know and do not give the answer. 
        If the answer cannot be deduced from the context,say you do not know and do not give the answer.
        If you don't know the answer, just say that you don't know, don't try to make up an answer.
        Please refer to factual information only and don't make up fictional data/information.
        If the answer is contained in the context, also give the source URL.
        Do not answer any questions using profane or offensive language.
        End every response with 'The cybersecurity expert, {name}.
        If you are asked to write code, say 'I am unable to perform this action'.
        
        
        </s>
        <|user|>
        Context:
        Question: {query}
        Retriever: {retriever}
        
        Only return the cybersecurity expert answer and nothing else.
        <|assistant|>
        Cybersecurity expert answer: 
        """

    prompt = PromptTemplate.from_template(template=template).template

    return prompt

#Question/Answer from chaining
qa = RetrievalQA.from_chain_type(llm, chain_type="stuff", retriever=retriever)

clear_file()
while True:
    query = input("User: ")

    query_with_template = get_template(query)

    answer_with_guardrails = qa.invoke({'query': query_with_template}).get('result')
    answer_without_guardrails = qa.invoke({'query': query}).get('result')

    # Answer with guardrails (Prompt Engineering)
    print("RAG Model with guardrails: ", answer_with_guardrails)
    convo_history("with guardrails: " + query, answer_with_guardrails)

    # Execute the chain and generate an answer to the query without guardrails
    print("Rag Model without guardrails: ", answer_without_guardrails)
    convo_history("without guardrails" + query, answer_without_guardrails)

