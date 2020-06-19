const todoCtrl = {}
const Todo = require('../models/todo')
const User = require('../models/user')

todoCtrl.getTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find();
        const okTodos = [];
        for (let i = 0; i < todos.length; i++) {
            const e = todos[i];
            const user = await User.findById(e.user_id);
            const todo = {
                _id : e._id,
                title : e.title,
                description : e.description,
                responsable : user.name,
                time_worked: e.time_worked,
                estimated_time: e.estimated_time,
                state: e.state
            }
            okTodos.push(todo);
        }
        res.status(200).json(okTodos);
    } catch (error) {
        next(error)
    }
}

todoCtrl.getTodo = async (req, res, next) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findById(id);
        const user = await User.findById(todo.user_id);
        const okTodo = {
            _id : todo._id,
            title : todo.title,
            description : todo.description,
            responsable : user.name,
            time_worked: todo.time_worked,
            estimated_time: todo.estimated_time,
            state: todo.state
        }
        res.status(200).json(okTodo);
    } catch (error) {
        next(error)
    }
}

todoCtrl.createTodo = async (req, res, next) => {
    const { body: todo } = req
    try {
        const td = new Todo({
            title : todo.title,
            description : todo.description,
            user_id : todo.user_id,
            time_worked: 0,
            estimated_time: todo.estimated_time,
            state: true
        })
        const { _id } = await td.save();
        const todoTemp = await Todo.findById(_id);
        const user = await User.findById(todoTemp.user_id);
        const okTodo = {
            _id : todoTemp._id,
            title : todoTemp.title,
            description : todoTemp.description,
            responsable : user.name,
            time_worked: todoTemp.time_worked,
            estimated_time: todoTemp.estimated_time,
            state: true
        }
        res.status(201).json({
            message: 'Todo created',
            todo: okTodo
        })
    } catch (error) {
        next(error)
    }
}

todoCtrl.updateTodo = async (req, res) => {
    const { id } = req.params
    const todo = {
        title : todo.title,
        description : todo.description,
        user_id : todo.user_id,
        estimated_time : todo.estimated_time
    }
    await Todo.findByIdAndUpdate(id, { $set: todo }, { new: true })
    res.json({
        status: 'Todo updated'
    })
}

todoCtrl.updateTodoTime = async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    let setTodo = {}
    if (parseInt(todo.time_worked) + parseInt(req.body.time) >= parseInt(todo.estimated_time)) {
        setTodo = {
            time_worked: todo.estimated_time,
            state: false
        }
    } else {
        setTodo = {
            time_worked: parseInt(todo.time_worked) + parseInt(req.body.time)
        }
    }
    const { _id } = await Todo.findByIdAndUpdate(id, { $set: setTodo }, { new: true });
    const todoTemp = await Todo.findById(_id);
    const user = await User.findById(todoTemp.user_id);
    const okTodo = {
        _id : todoTemp._id,
        title : todoTemp.title,
        description : todoTemp.description,
        responsable : user.name,
        time_worked: todoTemp.time_worked,
        estimated_time: todoTemp.estimated_time,
        state: todoTemp.state
    }
    res.status(200).json({
        status: 'Todo updated',
        todo: okTodo
    })
}

todoCtrl.deleteTodo = async (req, res) => {
    await Todo.findByIdAndRemove(req.params.id)
    res.status(200).json({
        status: 'Todo deleted'
    })
}

module.exports = todoCtrl