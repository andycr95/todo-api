const express = require('express');
const todoController  = require('../controllers/todoController');
const User = require('../models/user')

function routes(app) { 
    const router = new express.Router();
    app.use('/api', router)

    router.get('/users', async function (req, res) {
        users = await User.find();
        res.status(200).json(users);
    });
    router.post('/users', async function (req, res) {
        const { body: user } = req
        try {
            const us = new User({
                name: user.name,
                email: user.email,
            })
            await us.save()
            res.status(201).json({
                message: 'User created'
            })
        } catch (error) {
            next(error)
        }   
    });

    router.get('/todos', todoController.getTodos);
    router.get('/todos/:id', todoController.getTodo);
    router.post('/todos', todoController.createTodo);
    router.put('/todos/:id/updatetime', todoController.updateTodoTime);
    router.delete('/todos/:id', todoController.deleteTodo);

 }

module.exports = routes;