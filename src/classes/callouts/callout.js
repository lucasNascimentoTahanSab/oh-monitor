/**
 * @file Módulo responsável por estabelecer comunicação com endpoints do backend.
 * @copyright Lucas N. T. Sab
 */
import requests from './calloutRequest.js';
import endpoints from './calloutEndpoint.js';

const callouts = {
  code: {
    post: body => (
      new Promise((resolve, reject) => {
        fetch(endpoints.code.post(), requests.code.post(body))
          .then(response => resolve(response.json()))
          .catch(error => reject(error));
      })
    )
  },
  content: {
    signUp: body => (
      new Promise((resolve, reject) => {
        fetch(endpoints.content.signUp(), requests.content.signUp(body))
          .then(response => resolve(response.json()))
          .catch(error => reject(error));
      })
    ),
    signIn: body => (
      new Promise((resolve, reject) => {
        fetch(endpoints.content.signIn(), requests.content.signIn(body))
          .then(response => resolve(response.json()))
          .catch(error => reject(error));
      })
    ),
    getMe: () => (
      new Promise((resolve, reject) => {
        fetch(endpoints.content.getMe(), requests.content.getMe())
          .then(response => resolve(response.json()))
          .catch(error => reject(error));
      })
    ),
    updateMe: body => (
      new Promise((resolve, reject) => {
        fetch(endpoints.content.updateMe(), requests.content.updateMe(body))
          .then(response => resolve(response.json()))
          .catch(error => reject(error));
      })
    ),
    getSubject: uid => (
      new Promise((resolve, reject) => {
        fetch(endpoints.content.getSubject(uid), requests.content.getSubject())
          .then(response => resolve(response.json()))
          .catch(error => reject(error));
      })
    ),
    getExerciseAnswer: (exerciseUid, answer) => (
      new Promise((resolve, reject) => {
        fetch(endpoints.content.getExerciseAnswer(exerciseUid), requests.content.getExerciseAnswer({ answer }))
          .then(response => resolve(response.json()))
          .catch(error => reject(error));
      })
    ),
  },
  repo: {
    getCode: (path, language, extension) => (
      new Promise((resolve, reject) => {
        fetch(endpoints.repo.getCode(path, language, extension), requests.repo.getCode())
          .then(response => response.text())
          .then(response => resolve(response))
          .catch(error => reject(error));
      })
    )
  }
};

export default callouts;