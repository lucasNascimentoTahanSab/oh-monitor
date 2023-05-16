/**
 * @file Módulo responsável pela obtenção de endpoints para comunicação com o backend.
 * @copyright Lucas N. T. Sab
 */
export const endpoints = {
  code: {
    post: () => '/api/code/submit'
  },
  content: {
    getSubject: uuid => `api/content/subjects/${uuid}`,
    getCorrectAnswers: uuids => `api/content/answers?${uuids.map(uuid => `uuids[]=${uuid}`).join('&')}`
  },
  repo: {
    getFile: (path, language, extension) => `api/repo/${language}${path}.${extension}`
  }
};