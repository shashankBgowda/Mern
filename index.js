import express, { response } from "express";
import { PORT , mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookmodel.js";

const app = express();
app.use(express.json());

app.get('/',(request, response)=>{
    console.log(request);
    return response.status(234).send("welcome brun..!")
});

 //Route to create new book and to save it in mongoDB
app.post('/books', async (request, response)=>{
    try{
        const { title,author, publisherYear}  = request.body //it checks all the are there in request from client

        if(!title || !author || !publisherYear){
            return response.status(500).json({message : "please give all the details..!"})
        }
        // Create a new book object
        const newbook = {
            title: title,
            author : author,
            publisherYear : publisherYear
        };
        // Save the book in MongoDB
        const book = await Book.create(newbook);
        return response.status(201).json(book);
    }catch(error){
        response.status(500).json({message : 'error in adding book',  error});
    }
});

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("App connected to Data base..!");//to display in console
        app.listen(PORT, ()=>{
            console.log(`App is listning to your port number ${PORT}`);//to display in webpage
        });
    })
    .catch((error)=>{
        console.log('Data base connection error', error);
    });