const path = require('path');

// 'multer' para processar o upload de arquivos
const multer = require('multer');

// 'crypto' para geração de valores criptográficos (neste caso, um hash)
const cripto = require('crypto');

// Define o caminho absoluto para a pasta temporária ('tmp') e a pasta de upload ('uploads')
const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp');
const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, 'uploads');

// Configuração do Multer para o armazenamento de arquivos
const MULTER = {
  storage: multer.diskStorage({
    // Define o diretório de destino para os arquivos temporários
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = cripto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      // Chama a função de retorno com o nome do arquivo gerado
      return callback(null, fileName);
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOAD_FOLDER,
  MULTER,
};
