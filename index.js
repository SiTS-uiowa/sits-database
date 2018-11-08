'use strict'

const Hapi = require('hapi');

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello, world!'; // TODO: return a list of todos
  }
});

server.route({
  method: 'POST',
  path: '/',
  handler: (request, h) => {
    // TODO: create a TODO with a name and 'checked' value
  }
})

server.route({
  method: 'GET',
  path: '/{id}',
  handler: (request, h) => {
    // TODO: retrieve a todo item based on a unique id
  }
});

server.route({
  method: 'PUT',
  path: '/{id}',
  handler: (request, h) => {
    // TODO: update a todo item based on a unique id
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