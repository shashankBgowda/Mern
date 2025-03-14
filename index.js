import express, { request, response } from "express";
import { PORT , mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookmodel.js";
import bookroute from "./routes/bookroutes.js";
import cors from "cors";

const app = express();

//Middleware to parsing request body
app.use(express.json());

app.get('/',(request, response)=>{
    console.log(request);
    return response.status(234).send("welcome brun..!")
});

app.use('/books', bookroute);//it is also a middleware
app.use(cors({
    origin : "http://localhost:3000",
    methods : ['GET','PUT','POST','DELETE'],
    allowedHeader : ['content-type']
}
));

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