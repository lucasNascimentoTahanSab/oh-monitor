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
      body: JSON.stringify({
        screen: body.screen,
        state: {
          exercises: JSON.stringify(Array.from(body.state.exercises.entries())),
          snippets: JSON.stringify(Array.from(body.state.snippets.entries()))
        }
      })
    }),
    getSubject: () => ({
      method: 'GET'
    }),
    getExerciseAnswer: () => ({
      method: 'GET'
    })
  },
  repo: {
    getCode: () => ({
      method: 'GET'
    })
  }
};