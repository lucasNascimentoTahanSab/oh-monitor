export const endpoints = {
  code: {
    post: '/api/code/submit'
  },
  content: {
    getSubject: subjectId => `api/content/subjects/${subjectId}`
  }
};