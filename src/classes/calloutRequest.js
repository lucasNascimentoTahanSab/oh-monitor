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
    })
  },
  repo: {
    getFile: () => ({
      method: 'GET'
    })
  }
};