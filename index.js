'use strict'

const Hapi = require('hapi');
const mongoose = require('mongoose');
const Joi = require('joi');
const Boom = require('boom');

const Todo = require('./models/todo');
const TodoSchema = Joi.object().keys({
  name: Joi.string().required(),
  checked: Joi.bool(),
})

const url = "mongodb://localhost:27017/tododb";

mongoose.connect(url);
mongoose.connection.once('open', () => {
  console.log('connected to database');
})

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return Todo.find();
  }
});

server.route({
  method: 'GET',
  path: '/unchecked',
  handler: (request, h) => {
    return Todo.find({checked: false});
  }
})

server.route({
  method: 'POST',
  path: '/',
  handler: (request, h) => {
    const { error, value } = Joi.validate(request.payload, TodoSchema);
    if (error) return Boom.boomify(error, { statusCode: 400 });

    if (!value.checked) value.checked = false;

    const newTodo = new Todo({
      name: value.name,
      checked: value.checked,
    });
    return newTodo.save();
  }
})

server.route({
  method: 'GET',
  path: '/{id}',
  handler: (request, h) => {
    return Todo.findById(request.params.id);
  }
});

server.route({
  method: 'PUT',
  path: '/{id}',
  handler: async (request, h) => {
    const todo = await Todo.findById(request.params.id);
    const { error, value } = Joi.validate(request.payload, TodoSchema);
    if (error) return Boom.boomify(error, { statusCode: 400 });

    todo.name = value.name;
    todo.checked = value.checked;
    return todo.save();
  }
})

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();