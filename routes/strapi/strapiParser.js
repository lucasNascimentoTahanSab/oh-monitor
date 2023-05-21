/**
 * @file Módulo responsável por formatar retorno de integração com o Strapi para apresentação 
 * ao usuário.
 * @copyright Lucas N. T. Sab 2023
 */
const ST_PARSER = {
  parse(data) {
    if (typeof data !== 'object') { return data; }

    return JSON.parse(JSON.stringify(data).replaceAll(/"answer":(".+?"|null),?/g, ''));
  },
  parseCorrectAnswers(key, data) {
    if (typeof data !== 'object') { return { uid: key, correct: false }; }
    if (!Array.isArray(data.data)) { return { uid: key, correct: false }; }
    if (!data.data.length) { return { uid: key, correct: false }; }

    return { uid: key, correct: true };
  }
};

module.exports = ST_PARSER;