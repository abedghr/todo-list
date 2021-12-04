import axios from "axios";
const url = "http://localhost:5000/todo/";

export const readTodo = () => axios.get(url);
export const createTodo = newTodo => axios.post(url, newTodo);
export const deleteTodo = (id) => axios.delete(`${url}/${id}`);

export const updateIsDone = (id, isDone) => axios.patch(`${url}is_done/${id}/${isDone}`);
export const updateTodo = (id, updatedTodo) => axios.patch(`${url}/${id}`, updatedTodo);
