'use strict'

const Hapi = require('hapi');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  console.log("Database connected!");

  const dbo = db.db('tododb');

  dbo.createCollection('todos', (err, res) => {
    if (err) throw err;
    console.log("Collection created");

    const todos = [
      { name: "Take out trash", checked: false },
      { name: "Impeach Tanner", checked: false },
      { name: "Pass all classes, ever", checked: false },
    ];

    dbo.collection("todos").insertMany(todos, (err, res) => {
      if (err) throw err;
      console.log(`Number of documents inserted: ${res.insertedCount}`);
      db.close();
    });
  });
});

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