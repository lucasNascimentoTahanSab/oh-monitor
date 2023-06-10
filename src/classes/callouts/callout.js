/**
 * @file Módulo responsável por estabelecer comunicação com endpoints do backend.
 * @copyright Lucas N. T. Sab
 */
import requests from './calloutRequest.js';
import endpoints from './calloutEndpoint.js';
import Util from '../util/Util.js';

const callouts = {
  code: {
    post: body => (
      new Promise(resolve => {
        fetch(endpoints.code.post(), requests.code.post(body))
          .then(response => {
            if (response.status === 401) { Util.redirectToSignIn(); }

            resolve(response.json());
          })
          .catch(Util.redirectToSignIn);
      })
    )
  },
  content: {
    signUp: body => (
      new Promise(resolve => {
        fetch(endpoints.content.signUp(), requests.content.signUp(body))
          .then(response => {
            if (response.status === 401) { Util.redirectToSignIn(); }

            resolve(response.json());
          })
          .catch(Util.redirectToSignIn);
      })
    ),
    signIn: body => (
      new Promise(resolve => {
        fetch(endpoints.content.signIn(), requests.content.signIn(body))
          .then(response => {
            if (response.status === 401) { Util.redirectToSignIn(); }

            resolve(response.json());
          })
          .catch(Util.redirectToSignIn);
      })
    ),
    getMe: () => (
      new Promise(resolve => {
        fetch(endpoints.content.getMe(), requests.content.getMe())
          .then(response => {
            if (response.status === 401) { Util.redirectToSignIn(); }

            resolve(response.json());
          })
          .catch(Util.redirectToSignIn);
      })
    ),
    updateMe: body => (
      new Promise(resolve => {
        fetch(endpoints.content.updateMe(), requests.content.updateMe(body))
          .then(response => {
            if (response.status === 401) { Util.redirectToSignIn(); }

            resolve(response.json());
          })
          .catch(Util.redirectToSignIn);
      })
    ),
    getSubject: uid => (
      new Promise(resolve => {
        fetch(endpoints.content.getSubject(uid), requests.content.getSubject())
          .then(response => {
            if (response.status === 401) { Util.redirectToSignIn(); }

            resolve(response.json());
          })
          .catch(Util.redirectToSignIn);
      })
    ),
    getExerciseAnswer: (exerciseUid, answer) => (
      new Promise(resolve => {
        fetch(endpoints.content.getExerciseAnswer(exerciseUid), requests.content.getExerciseAnswer({ answer }))
          .then(response => {
            if (response.status === 401) { Util.redirectToSignIn(); }

            resolve(response.json());
          })
          .catch(Util.redirectToSignIn);
      })
    ),
  },
  repo: {
    getCode: (path, language, extension) => (
      new Promise(resolve => {
        fetch(endpoints.repo.getCode(path, language, extension), requests.repo.getCode())
          .then(response => {
            if (response.status === 401) { Util.redirectToSignIn(); }

            resolve(response.text());
          })
          .catch(Util.redirectToSignIn);
      })
    )
  }
};

export default callouts;