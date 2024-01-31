/*
In this file we will import all the routes of our application and export them as a single module.

*/

// Import the Router class from the express module
const { Router } = require('express');

// Import the user routes
const userRouter = require('./user.routes');

const notesRouter = require('./notes.routes');

const tagsRouter = require('./tags.routes');

const sessionsRoutes = require('./sessions.routes');

// Create a new Router instance
const routes = Router();

// Use the user routes
routes.use('/users', userRouter); //http://localhost:3333/users/
routes.use('/notes', notesRouter); //http://localhost:3333/notes
routes.use('/tags', tagsRouter); //http://localhost:3333/tags
routes.use('/sessions', sessionsRoutes); //http://localhost:3333/sessions

module.exports = routes;
