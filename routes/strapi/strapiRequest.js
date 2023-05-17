/**
 * @file Módulo responsável pela elaboração de requisições à API Strapi.
 * @copyright Lucas N. T. Sab 2023 
 */
require('dotenv').config();

const ST_REQUEST = {
  /**
   * Método responsável pela obtenção de corpo da requisição ao Strapi a partir
   * da requisição recebida para recuperação do assunto desejado.
   * 
   * @param {object} req 
   * @returns {object}
   */
  getSubjectRequest(req) {
    return {
      method: 'GET',
      url: `${process.env.ST_ENDPOINT}/subjects?` +
        getFilter('uid', req.params.subjectId) + '&' +
        getPopulate('tabs', 'sections.sections.elements.exercises.choices', '0') + '&' +
        getPopulate('tabs', 'sections.sections.elements.exercises.codes', '1') + '&' +
        getPopulate('tabs', 'sections.sections.elements.elements', '2') + '&' +
        getPopulate('tabs', 'sections.elements.exercises.choices', '3') + '&' +
        getPopulate('tabs', 'sections.elements.exercises.codes', '4') + '&' +
        getPopulate('tabs', 'sections.elements.elements', '5') + '&' +
        getPopulate('tabs', 'navigation.navigationItems.navigationItems', '6')
      ,
      headers: { 'Authorization': process.env.ST_TOKEN },
    };
  },
  /**
   * Método responsável pela obtenção de corpo da requisição ao Strapi a partir
   * da requisição recebida para verificar resposta dada ao exercício recebido.
   * 
   * @param {object} req 
   * @returns {object}
   */
  getExerciseAnswerRequest(req) {
    return {
      method: 'GET',
      url: `${process.env.ST_ENDPOINT}/exercises?` +
        getFilter('uid', req.query.exerciseId) + '&' +
        getFilter('answer', req.query.answer),
      headers: { 'Authorization': process.env.ST_TOKEN },
    };
  }
};

/**
 * Método responsável por obter comando para popular níveis mais internos do
 * objeto recebido.
 * 
 * @param {string} object 
 * @param {string} item 
 * @param {string} index 
 * @returns {string}
 */
function getPopulate(object, item, index) {
  if (!object) { return ''; }
  if (!item) { return ''; }

  return `populate[${object}][populate][${index}]=${item}`;
}

/**
 * Método responsável por obter comando para filtrar registros de acordo com
 * objeto e item recebidos.
 * 
 * @param {string} object 
 * @param {string} item 
 * @returns {string}
 */
function getFilter(object, item) {
  if (!object) { return ''; }
  if (!item) { return ''; }

  return `filters[${object}][$eq]=${item}`;
}

/**
 * Método responsável por obter comando para filtrar registros de acordo com
 * objeto e itens recebidos.
 * 
 * @param {string} object 
 * @param {string} items 
 * @returns {string}
 */
function getFilterForValues(object, items) {
  if (!items?.length) { return ''; }

  return items.map((item, index) => `filters[${object}][$in][${index}]=${item}`, '').join('&');
}

module.exports = ST_REQUEST;