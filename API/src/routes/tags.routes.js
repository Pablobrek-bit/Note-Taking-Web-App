const { Router } = require('express');
const tagsRoutes = Router();
const TagsController = require('../controller/TagsController');
const ensureAutheticaded = require('../middlewares/ensureAutheticaded');

const tagsController = new TagsController();

tagsRoutes.get('/', ensureAutheticaded, tagsController.index);

module.exports = tagsRoutes;
