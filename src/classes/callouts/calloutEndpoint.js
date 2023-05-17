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
    getExerciseAnswer: (exerciseUid, answer) => `api/content/exercises?exerciseUid=${exerciseUid}&answer=${answer}`
  },
  repo: {
    getCode: (path, language, extension) => `api/repo/${language}${path}.${extension}`
  }
};