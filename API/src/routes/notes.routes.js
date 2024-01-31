const { Router } = require('express');
const notesRoutes = Router();
const NotesController = require('../controller/NotesController');
const ensureAutheticaded = require('../middlewares/ensureAutheticaded');

const notesController = new NotesController();

notesRoutes.use(ensureAutheticaded);

notesRoutes.get('/', notesController.index);
notesRoutes.post('/', notesController.create);
notesRoutes.get('/:id', notesController.show);
notesRoutes.delete('/:id', notesController.delete);

module.exports = notesRoutes;
