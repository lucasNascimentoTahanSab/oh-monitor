/**
 * @file Módulo responsável por estabelecer comunicação com endpoints do backend.
 * @copyright Lucas N. T. Sab
 */
import { requests } from './calloutRequest.js';
import { endpoints } from './calloutEndpoint.js';

const callouts = {
  code: {
    post: async body => (
      new Promise((resolve, reject) => {
        fetch(endpoints.code.post(), requests.code.post(body))
          .then(response => resolve(response.json()))
          .catch(error => reject(error))
      })
    )
  },
  content: {
    getSubject: async uid => (
      new Promise((resolve, reject) => {
        fetch(endpoints.content.getSubject(uid), requests.content.getSubject())
          .then(response => resolve(response.json()))
          .catch(error => reject(error))
      })
    ),
    getCorrectAnswers: async uids => (
      new Promise((resolve, reject) => {
        fetch(endpoints.content.getCorrectAnswers(uids), requests.content.getCorrectAnswers())
          .then(response => resolve(response.json()))
          .catch(error => reject(error))
      })
    ),
  },
  repo: {
    getFile: async (path, language, extension) => (
      new Promise((resolve, reject) => {
        fetch(endpoints.repo.getFile(path, language, extension), requests.repo.getFile())
          .then(response => resolve(response.json()))
          .catch(error => reject(error))
      })
    )
  }
};

export default callouts;