export const endpoints = {
  code: {
    post: '/api/code/submit'
  },
  content: {
    getSubject: uuid => `api/content/subjects/${uuid}`
  }
};