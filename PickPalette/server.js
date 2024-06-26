import mongoose from "mongoose";
import cors from "cors";
import OpenAI from "openai";

import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// Load environment variables
dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const app = express();
const PORT = process.env.PORT || 4000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up middleware to parse JSON requests
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Configure OpenAI API
OpenAI.apiKey = OPENAI_API_KEY;

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("MongDB successfully connected")
}).catch((e) => console.log(e));

const storeData = new mongoose.Schema({
    query: [String],
    savedPalettes: String,
});

const StoredPalettes = mongoose.model("Saved Palettes", storeData);
const openai = new OpenAI({
    apikey:OPENAI_API_KEY
});

const corsPorts = {
    origin: ["http://localhost:3000"]
};

app.get('/get_test', async (req, res) =>{
    res.json({value: 'test value'});
})

app.post('/get_palette', async (req, res) =>{
    const { query } = req.body;
    console.log("Query: " + query);
    try{
        const response = await openai.chat.completions.create({
            model:"gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Create color palettes based on user's input. The number of colors should be 6. Reply with JSON array of hexadecimal colors",
                },
                {
                    role: "user", 
                    content: query,
                },
            ],
            max_tokens:200,
            temperature:0.7,
        });
        
        console.log("Answer: ");
        console.log(response.choices[0]['message']['content']);
        
        const generatedPalettes = JSON.parse(response.choices[0]['message']['content']);
        const newPalette = new StoredPalettes({query, generatedPalettes});
        await newPalette.save();
        res.json(generatedPalettes);
    } catch (error){
        console.error("Error calling OpenAI API", error);
        res.status(500).json({error: "Internal Server Error"});
    }
    
})


app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
console.log("Test");
