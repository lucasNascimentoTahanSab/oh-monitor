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
    signUp: body => ({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }),
    signIn: body => ({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }),
    getMe: () => ({
      method: 'GET'
    }),
    updateMe: body => ({
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, state: Array.from(body.state.entries()) })
    }),
    getSubject: () => ({
      method: 'GET'
    }),
    getExerciseAnswer: body => ({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
  },
  repo: {
    getCode: () => ({
      method: 'GET'
    })
  }
};