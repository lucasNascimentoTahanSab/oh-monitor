/**
 * @file Módulo responsável pela obtenção de endpoints para comunicação com o backend.
 * @copyright Lucas N. T. Sab
 */
export const endpoints = {
  code: {
    post: () => '/api/code/submit'
  },
  content: {
    signUp: () => '/api/content/signUp',
    signIn: () => '/api/content/signIn',
    getMe: () => '/api/content/me',
    updateMe: () => '/api/content/me/update',
    getSubject: uid => `/api/content/subjects/${encodeURI(uid)}`,
    getExerciseAnswer: uid => `/api/content/exercises/${encodeURI(uid)}`
  },
  repo: {
    getCode: (path, language, extension) => `/api/repo/${encodeURI(language)}${encodeURI(path)}.${encodeURI(extension)}`
  }
};