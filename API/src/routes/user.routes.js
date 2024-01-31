// This file contains the routes for the user entity
const multer = require('multer');
const { Router } = require('express');
const uploadConfig = require('../configs/upload');

const UsersController = require('../controller/UsersController');
const ensureAutheticaded = require('../middlewares/ensureAutheticaded');
const UserAvatarController = require('../controller/UserAvatarController');

const userRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const userController = new UsersController();
const userAvatarController = new UserAvatarController();

// Create a POST route
userRoutes.post('/', userController.create);
userRoutes.put('/', ensureAutheticaded, userController.update);
userRoutes.patch(
  '/avatar',
  ensureAutheticaded,
  upload.single('avatar'),
  userAvatarController.update,
);

module.exports = userRoutes;
