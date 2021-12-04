import { validationResult } from "express-validator";
import mongoose from "mongoose";
import Todo from "../models/Todo.js";

export const ReadAllTodos = async (req, res) => {
    try {
        
        const todos = await Todo.find().sort({is_done:1, createdAt: -1});
        res.status(200).json(todos);

    } catch(error) {
        res.status(404).json({error: error.message});
    }
}

export const CreateTodo = async (req, res) => {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    const todo = new Todo(req.body);
    
    try {
        if(await todo.save()) {
            res.status(201).json(todo);
        }
        res.status(409).json({error: error.message});
    } catch( error ) {
        res.status(409).json({error: error.message});
    }
}

export const DeleteTodo = async (req, res) => {
   try {

    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`the id ${id} is not invalid`);
    }
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "row Deleted" });

   } catch (error) {
       res.status(500).json({error: error.message});
   }
}

export const UpdateTodo = async (req, res) => {
    try {

        const { id } = req.params;
        const {phone,title,content} = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send(`the id ${id} is not invalid`);
        }
        const todo = {phone,title,content,_id:id};
        const todoData =  await Todo.findByIdAndUpdate(id,todo,{new:true});
        res.json(todoData);
       } catch (error) {
           res.status(500).json({error: error.message});
       }
}

export const isDoneUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        const is_done = Number(req.params.isDone);
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send(`the id ${id} is not invalid`);
        }
        const todo = await Todo.findByIdAndUpdate(id,{'is_done': is_done},{new:true});
        res.json(todo);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}