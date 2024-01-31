// The class that will control the users

const AppError = require('../utils/AppError');
const sqlite = require('../database/sqlite');
const { hash, compare } = require('bcryptjs');

class UsersController {
  /*
    index - GET for list all users
    show - GET for list ONE user
    create - POST for create a new user
    update - PUT for update a user
    delete - DELETE for delete a user
  */

  async create(request, response) {
    // Get the name, email and password from the request body
    const { name, email, password } = request.body;

    // Check if the name is empty
    if (!name) {
      // If name is empty, throw a new error of type AppError
      throw new AppError('Name is required');
    }

    const database = await sqlite();
    const users = await database.get('SELECT * FROM users WHERE email = (?)', [
      email,
    ]);

    if (users) {
      throw new AppError('Email already exists');
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
    );

    // If no have errors, return a response with the name, email and password
    return response.status(201).json();
  }

  async update(request, response) {
    const user_id = request.user.id;
    let { name, email, password, old_password } = request.body;

    const database = await sqlite();
    const users = await database.get('SELECT * FROM users WHERE id = (?)', [
      user_id,
    ]);
    const usersEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email],
    );

    // If the name or email is empty, use the name and email of the user
    name = name ?? users.name;
    email = email ?? users.email;

    // Verify if the user exists
    if (!users) {
      throw new AppError('User not found');
    }

    // Verify if the old_password is empty
    if (password && !old_password) {
      throw new AppError('Old password is required');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, users.password);

      // Verify if the old_password is correct
      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }
    }

    // Verify if the email already exists
    if (usersEmail && usersEmail.id !== users.id) {
      throw new AppError('Email already exists');
    }

    // Verify if the password is empty and update the user
    if (!password && !old_password) {
      await database.run(
        'UPDATE users SET name = (?), email = (?) WHERE id = (?)',
        [name, email, user_id],
      );

      return response.status(200).json();
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      'UPDATE users SET name = (?), email = (?), password = (?) WHERE id = (?)',
      [name, email, hashedPassword, user_id],
    );

    return response.status(200).json();
  }
}

module.exports = UsersController;
