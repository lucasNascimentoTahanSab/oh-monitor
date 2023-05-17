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
  parseCorrectAnswers(data) {
    if (typeof data !== 'object') { return { correct: false }; }
    if (!Array.isArray(data.data)) { return { correct: false }; }
    if (!data.data.length) { return { correct: false }; }

    return { correct: true };
  },
};

module.exports = ST_PARSER;