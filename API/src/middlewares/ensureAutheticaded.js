const AppError = require('../utils/AppError');
const { verify } = require('jsonwebtoken');
const authConfig = require('../configs/auth');

function ensureAutheticaded(request, response, next) {
  // Obtendo o token JWT do cabeçalho de autorização da requisição
  const authHeader = request.headers.authorization;

  // Verificando se o token está presente no cabeçalho
  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // Separando o prefixo 'Bearer' do token
  const [, token] = authHeader.split(' ');

  try {
    // Verificando e decodificando o token usando a chave secreta definida nas configurações
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    // Adicionando o ID do usuário autenticado ao objeto de solicitação (request)
    request.user = {
      id: Number(user_id),
    };

    // Continuando a execução da aplicação
    next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}

module.exports = ensureAutheticaded;
