/**
 * @file Módulo responsável pela elaboração de requisições à API Strapi.
 * @copyright Lucas N. T. Sab 2023 
 */
require('dotenv').config();

const ST_REQUEST = {
  /**
   * Método responsável pela obtenção de corpo da requisição ao Strapi a partir
   * da requisição recebida para recuperação do usuário atual.
   * 
   * @param {object} req 
   * @returns {object}
   */
  getMe(req) {
    return {
      method: 'GET',
      url: `${process.env.ST_ENDPOINT}/users/me`,
      headers: { 'Authorization': `Bearer ${req.session.token}` }
    };
  },
  /**
   * Método responsável pela obtenção de corpo da requisição ao Strapi a partir
   * da requisição recebida para atualização do usuário atual.
   * 
   * @param {object} req 
   * @returns {object}
   */
  updateMe(req) {
    return {
      method: 'PUT',
      url: `${process.env.ST_ENDPOINT}/users/${req.body.id}`,
      headers: { 'Authorization': `Bearer ${req.session.token}` },
      data: req.body
    };
  },
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
        getPopulate('tabs', 'sections.sections.elements.snippet.codes', '2') + '&' +
        getPopulate('tabs', 'sections.sections.elements.elements', '3') + '&' +
        getPopulate('tabs', 'sections.elements.exercises.choices', '4') + '&' +
        getPopulate('tabs', 'sections.elements.exercises.codes', '5') + '&' +
        getPopulate('tabs', 'sections.elements.snippet.codes', '6') + '&' +
        getPopulate('tabs', 'sections.elements.elements', '7') + '&' +
        getPopulate('tabs', 'navigation.navigationItems.navigationItems', '8'),
      headers: { 'Authorization': `Bearer ${req.session.token}` }
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
      url: `${process.env.ST_ENDPOINT}/exercises?${getFilter('uid', req.params.exerciseId)}`,
      headers: { 'Authorization': `Bearer ${req.session.token}` }
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

module.exports = ST_REQUEST;