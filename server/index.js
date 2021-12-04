import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Routes 
import TodoRoutes from "./routes/todoRoutes.js";

const app = express();
// dotenv.config();

app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/todo', TodoRoutes);


app.get('/', (req, res) => {
    res.send("Welcome To Server Side");
});


const PORT = process.env.PORT || 5000;

var mongodb = "mongodb://localhost:27017/todo_list"
mongoose.connect(mongodb).then(() => {
    app.listen(PORT);
    console.log(`Server is running on port ${PORT}`)
    console.log(`Mongo DB Connected`)
});