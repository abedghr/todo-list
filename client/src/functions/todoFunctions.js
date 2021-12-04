import * as api from "../api/todoApi.js";


export const readTodo = async () => {
    try {

        const { data } = await api.readTodo();
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const createTodo = async (todo) => {
    try {
        const { data } = await api.createTodo(todo);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteTodo = async(id) => {
    try {
        await api.deleteTodo(id)
    } catch(error) {
        console.log(error)
    }
}

export const updateTodo = async( id, updatedTodo ) => {
    try {
        const { data } = await api.updateTodo(id,updatedTodo);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateTodoIsDone = async ( id, isDone ) => {
    try {
        const { data } = await api.updateIsDone( id, isDone );
        return data;
    } catch (error) {
        console.log(error);
    }
}