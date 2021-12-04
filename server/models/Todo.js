import mongoose from "mongoose";

const Schema = mongoose.Schema;
const TodoSchema = new Schema({
    username :{
        type: String,
        required: false,
    },
    phone : {
        type: String,
        required: true,
    },
    is_done : {
        type: Number,
        default: 0,
        required: true,
    },
    title : {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        default: Date.now
    },
    end_date: {
        type: Date,
        default: new Date(+new Date() + 7*24*60*60*1000)
    }
},{timestamps: true});

const Todo = mongoose.model('todo',TodoSchema);

export default Todo;