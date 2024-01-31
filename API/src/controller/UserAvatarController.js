const DiskStorage = require('../providers/DiskStorage');
const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class UserAvatarController {
  async update(request, response) {
    const diskStorage = new DiskStorage();

    const user_id = request.user.id;
    const avatarFileName = request.file.filename;

    const user = await knex('users').where({ id: user_id }).first();

    // Verifica se o usuário existe
    if (!user) {
      throw new AppError(
        'Somente usuários autenticados podem mudar o avatar',
        401,
      );
    }

    // Verifica se existe foto de perfil anterior, caso tenha apagar para atualizar
    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    // Salva o arquivo dentro da pasta uploads
    const filename = await diskStorage.saveFile(avatarFileName);
    user.avatar = filename;

    // Atualiza o usuário no banco de dados
    await knex('users').update(user).where({ id: user_id });

    return response.json(user);
  }
}

module.exports = UserAvatarController;
