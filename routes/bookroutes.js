import express from  'express';
import { Book } from "../models/bookmodel.js"

const router = express.Router();

//Route to create new book and to save it in mongoDB
router.post('/', async (request, response)=>{
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
router.get('/',async(request, response)=>{
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
router.get('/:id', async(request, response)=>{ //we used : becz, route parameters are dynamic in URL so we use :
    try{
        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book)

    }catch(error){
        console.log(error);
        return response.status(500).send({message : error.message});
    }
});

//update book
router.put('/:id', async(request, response)=>{
    try{
        if(!request.body.title||
            !request.body.author ||
            !request.body.publisherYear
        ){
            return response.status(404).send({message:"error in input..!"})
        }
        const {id} = request.params;
        const res = await Book.findByIdAndUpdate(id, request.body);
        if(!res){
            return response.status(400).json({message:"book not found"});
        }
        return response.status(503).send({message:"Done man..! UPDATion is Donee.."});
    }catch(error){
        console.log(error);
        return response.status(500).send({message:error.message})
    }
});

//deleting a book by using id
router.delete('/:id', async(request, response)=>{
    try{
        const {id} = request.params;
        const delbook = await Book.findByIdAndDelete(id);
        if(!delbook){
            return response.status(404).json({message: "book not found..!"});
        }
        return response.status(200).json({message : "Successfully deletion is done..!"});
    }catch(error){
        console.log(error);
        return response.status(500).send({message:error.message})
    }
});

export default router;