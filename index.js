import express, { request, response } from "express";
import { PORT , mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookmodel.js";

const app = express();
//Middleware to parsing request body
app.use(express.json());

app.get('/',(request, response)=>{
    console.log(request);
    return response.status(234).send("welcome brun..!")
});

 //Route to create new book and to save it in mongoDB
app.post('/books', async (request, response)=>{
    try{
        //const { title,author, publisherYear}  = request.body //it checks all the are there in request from client

        if(
            !request.body.title || 
            !request.body.author || 
            !request.body.publisherYear)
        {
            return response.status(500).send({message : "please give all the details..!"})
        }
        // Create a new book object
        const newbook = {
            title: request.body.title,
            author : request.body.author,
            publisherYear : request.body.publisherYear,
        };
        // Save the book in MongoDB
        const book = await Book.create(newbook);
        return response.status(201).send(book);
    }catch(error){
        console.log(error.message);
        response.status(500).json({message : 'error in adding book',  error});
    }
});

//get all books from database
app.get('/books',async(request, response)=>{
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count : books.length,
            data:books
        });
    }catch(error){
        console.log(error);
        response.status(500).send({message: error.message});
    }
})

//get book by its id
app.get('/books/:id', async(request, response)=>{
    try{
        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book)

    }catch(error){
        console.log(error);
        return response.status(500).send({message : error.message});
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