const fs = require('fs');
const uploadConfig = require('../configs/upload');
const path = require('path');

class DiskStorage {
  async saveFile(file) {
    // Vai mover o arquivo da pasta temporária para a pasta de uploads
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOAD_FOLDER, file),
    );

    return file;
  }

  async deleteFile(file) {  
    // Obtém o caminho completo do arquivo
    const filePath =path.resolve(uploadConfig.UPLOAD_FOLDER, file);

    // Verifica se o arquivo existe 
    try {
      await fs.promises.stat(filePath);
    } catch (err) {
      return;
    }

    // Se existir, exclui o arquivo
    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
