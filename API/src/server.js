// Passos
/*
1 - Criar o arquivo server.js que vai ser o arquivo principal da aplicação
2 - Instalar o express que vai servir para criar o servidor
3 - Instalar o nodemon que vai servir para reiniciar o servidor automaticamente
4 - Depois criar uma pastas de rotas, que vai servir para criar as rotas e armazenar em um só arquivo
5 - Depois criar middleware em uma pasta controller, que vai servir para criar as regras de negócio para cada rota
6 - Depois tratar os erros que podem ser gerados na aplicação instalando o express-async-errors
7 - Com isso criar uma pasta utils que vai criar um arquivo com a classe AppError que vai ser um tipo de error personalizado
8 - Depois criar no servido um middleware que vai tratar os erros que podem ser gerados na aplicação
9 - Após instalar o sqlite3 e o sqlite que vai ser o banco de dados da aplicação
  - O sqlite3 serve para fornecer o driver e o sqlite serve para fornecer o comando para criar as tabelas e iniciar o banco de dados
*/

//====================================================================================================
//Installs

/* 
Express: npm install express --save
Nodemon: npm install nodemon --save-dev
Express-async-errors: npm install express-async-errors --save
SQLite3 and SQLite: npm install sqlite3 sqlite --save
BCrypt: npm install bcrypt 
Knex: npm install knex --save
      npx knex init
JsonWebToken: npm install jsonwebtoken
Multer: npm install multer
Cors: npm install cors
Axios: npm install axios

//====================================================================================================
// HTTP Verbs

// GET: Receive resource
// POST: Create resource
// PUT: Update resource
// DELETE: Delete resource
// PATCH: Update specific resource field

//====================================================================================================
// Return types

// Request: Receive data from the client
// Response: Send data to the client

//====================================================================================================
// Routes params: Is necessary to use all params

/*
Ex: http://localhost:3333/message/1
*/

//====================================================================================================
// Query params : Not is necessary to use all params

/*
Ex: http://localhost:3333/message/?page=2&limit=10
params: {
    "page": "2",
    "limit": "10"
}
*/

require('express-async-errors');
require('dotenv/config');
// Initialize express
const express = require('express');
// Import the arquive where database initialize
const migrationRun = require('./database/sqlite/migrations');
// Import the arquive cors
const cors = require('cors');

// Import the arquive index.js
const routes = require('./routes');
const AppError = require('./utils/AppError');
const uploadConfig = require('./configs/upload');

// Run the migration
migrationRun();

// Initialize express
const app = express();
// Initialize cors
app.use(cors());
// Initialize express to use JSON in body
app.use(express.json());

app.use('/files', express.static(uploadConfig.UPLOAD_FOLDER));

app.use(routes);

// When throw a new error of type AppError or any type exception, this middleware will be called
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'Error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: `Internal server error ${error.message}`,
  });
});

// Initialize the server
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
