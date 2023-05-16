/**
 * @file Módulo responsável por formatar retorno de integração com o Strapi para apresentação 
 * ao usuário.
 * @copyright Lucas N. T. Sab 2023
 */
const ST_PARSER = {
  parse(data) {
    if (typeof data !== 'object') { return data; }

    return JSON.parse(JSON.stringify(data).replaceAll(/"correct":[false|true]+,?/g, ''));
  },
  parseCorrectAnswers(data) {
    if (typeof data !== 'object') { return data; }

    return data.data?.map(answer => answer.attributes?.uuid);
  },
};

module.exports = ST_PARSER;