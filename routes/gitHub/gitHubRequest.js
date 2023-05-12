/**
 * @file Módulo responsável pela elaboração de requisições à API GitHub.
 * @copyright Lucas N. T. Sab 2023 
 */
require('dotenv').config();

const GH_REQUEST = {
  getRequest(url) {
    return {
      method: 'GET',
      url: `${process.env.GH_ENDPOINT}/repos/${process.env.GH_OWNER}/${process.env.GH_REPO}/contents${url}`,
      headers: {
        'Authorization': process.env.GH_TOKEN,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': process.env.GH_VERSION
      }
    };
  },
  getRequestFor(download) {
    return {
      method: 'GET',
      url: download,
      headers: {
        'Authorization': process.env.GH_TOKEN,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': process.env.GH_VERSION
      }
    };
  }
};

module.exports = GH_REQUEST;