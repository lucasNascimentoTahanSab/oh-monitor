/**
 * @file Módulo responsável pela obtenção de endpoints para comunicação com o backend.
 * @copyright Lucas N. T. Sab
 */
export const endpoints = {
  code: {
    post: () => '/api/code/submit'
  },
  content: {
    postUser: () => '/api/content/users',
    getSubject: uid => `/api/content/subjects/${encodeURI(uid)}`,
    getExerciseAnswer: (exerciseUid, answer) => `/api/content/exercises?exerciseUid=${encodeURI(exerciseUid)}&answer=${encodeURI(answer)}`
  },
  repo: {
    getCode: (path, language, extension) => `/api/repo/${encodeURI(language)}${encodeURI(path)}.${encodeURI(extension)}`
  }
};