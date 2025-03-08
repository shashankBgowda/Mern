import express from "express";
import { PORT } from "./config.js";

const app = express();
app.get('/',(request, response)=>{
    console.log(request);
    return response.status(234).send("welcome brun..!")
})

app.listen(PORT, ()=>{
    console.log(`App is listning to your port number ${PORT}`);
})