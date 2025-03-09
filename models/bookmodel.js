import mongoose from "mongoose";

//book schema
const bookschema = mongoose.Schema({
    title : {
        type: String, 
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    publisherYear : {
        type : Number,
        required : true,
    },
},{
    timestamp : true,
}
);


export const Book = mongoose.model('Book' , { name : String });