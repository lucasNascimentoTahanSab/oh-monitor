/**
 * @file Módulo responsável pela obtenção de endpoints para comunicação com o backend.
 * @copyright Lucas N. T. Sab
 */
export const endpoints = {
  code: {
    post: () => '/api/code/submit'
  },
  content: {
    getSubject: uid => `api/content/subjects/${uid}`,
    getCorrectAnswers: uids => `api/content/exercises?${uids.map(uid => `uids[]=${uid}`).join('&')}`
  },
  repo: {
    getFile: (path, language, extension) => `api/repo/${language}${path}.${extension}`
  }
};