/**
 * @file Módulo responsável pela elaboração de requisições à API Strapi.
 * @copyright Lucas N. T. Sab 2023 
 */
require('dotenv').config();

const ST_REQUEST = {
  getSubjectRequest(req) {
    return {
      method: 'GET',
      url: `${process.env.ST_ENDPOINT}/subjects?filters[uuid][$eq]=${req.params.subjectId}&populate[tabs][populate][0]=sections.codes&populate[tabs][populate][1]=sections.elements.elements&populate[tabs][populate][2]=exercises.answers&populate[tabs][populate][3]=navigation.navigationItems.navigationItems`,
      headers: { 'Authorization': process.env.ST_TOKEN },
    };
  }
};

module.exports = ST_REQUEST;