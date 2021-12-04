import express from "express";
import { CreateTodo, DeleteTodo, isDoneUpdate, ReadAllTodos, UpdateTodo } from "../controllers/TodoController.js";
import { body, validationResult } from "express-validator";


const router = express.Router();

router.get('/',ReadAllTodos);
router.post('/',CreateTodo);
    // body('phone').isEmpty().withMessage("Phone Cannot be blank").isLength({min:10, max:10}).withMessage('Phone should be 10 characters'),
    // body('title').isEmpty().withMessage("Title Cannot be blank"),
    // body('content').isEmpty().withMessage("Content Cannot be blank")
router.delete('/:id', DeleteTodo);
router.patch('/:id',UpdateTodo);
    // ,body('phone').isEmpty().withMessage("Phone Cannot be blank").isLength({min:10, max:10}).withMessage('Phone should be 10 characters'),
    // body('title').isEmpty().withMessage("Title Cannot be blank"),
    // body('content').isEmpty().withMessage("Content Cannot be blank")
router.patch('/is_done/:id/:isDone', isDoneUpdate);


export default router;