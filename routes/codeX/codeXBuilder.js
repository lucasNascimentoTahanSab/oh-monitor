/**
 * @file Módulo responsável pela montagem do código a ser enviado à API CodeX.
 * 
 * A API disponibiliza apenas uma entrada para códigos. Para emular o envio de múltiplos arquivos à API, 
 * apresentam-se os arquivos separadamente ao usuário, mas são agregados antes do envio. 
 * 
 * Além disso, para possibilitar animação correspondente aos comandos escolhidos, são recuperados códigos 
 * no GitHub previamente populados por saídas que indiquem a animação a ser executada (alternativePath).
 * 
 * @copyright Lucas N. T. Sab 2023 
 */
const GH = require('../gitHub/gitHubRouter.js');

/**
 * Método responsável pela montagem dos arquivos a serem enviados ao CodeX para compilação/interpretação 
 * e execução. 
 * 
 * @param {array} files 
 * @param {object} config 
 * @returns {Promise}
 */
async function build(files, config) {
  return (await Promise.all(sortFilesByOrder(files, config)?.map(async file => {
    return file.alternativePath ? (await getAlternativeFile(getAlternativeFileEndpoint(file, config)))?.data : file.code;
  }))).reduce((code, data) => `${code}${data}\n`, '');
}

function getAlternativeFileEndpoint(file, config) {
  return `/${config?.language}${file?.alternativePath}.${config?.languages?.[config.language]?.extension}`
}

/**
 * Método responsável pela obtenção de arquivo correspondente alternativo a partir da URL recebida
 * contendo os comandos para animação.
 * 
 * @param {string} url 
 * @returns {Promise}
 */
function getAlternativeFile(url) {
  return new Promise((resolve, reject) =>
    GH.getFile(url)
      .then(response => resolve({ data: response.data }))
      .catch(error => reject(error))
  );
}

/**
 * Método responsável por ordenar os arquivos recebidos antes de agregá-los, de acordo com configurações 
 * pré-definidas para garantia de compilação/interpretação de múltiplos arquivos pelo CodeX.
 * 
 * @param {array} files 
 * @param {object} config 
 * @returns {array}
 */
function sortFilesByOrder(files, config) {
  if (!files?.length) { return null; }

  return config?.languages?.[config.language]?.sort === 'asc' ? sortFilesByOrderAsc(files) : sortFilesByOrderDesc(files);
}

function sortFilesByOrderAsc(files) {
  if (!files?.length) { return null; }

  return files.sort((firstFile, secondFile) => firstFile.order > secondFile.order ? 1 : -1);
}

function sortFilesByOrderDesc(files) {
  if (!files?.length) { return null; }

  return files.sort((firstFile, secondFile) => firstFile.order > secondFile.order ? -1 : 1);
}

const CX_BUILDER = { build };

module.exports = CX_BUILDER;