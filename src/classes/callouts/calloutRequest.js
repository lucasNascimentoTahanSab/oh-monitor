/**
 * @file Módulo responsável pela obtenção da requisição para comunicação com o backend.
 * @copyright Lucas N. T. Sab
 */
export const requests = {
  code: {
    post: body => ({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
  },
  content: {
    getSubject: () => ({
      method: 'GET'
    }),
    getCorrectAnswers: () => ({
      method: 'GET'
    })
  },
  repo: {
    getFile: () => ({
      method: 'GET'
    })
  }
};