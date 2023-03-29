export const endpoints = {
  code: {
    post: '/api/code/submit'
  },
  content: {
    getSubject: uuid => `api/content/subjects/${uuid}`
  },
  repo: {
    getFile: (path, language, extension) => `api/repo/${language}${path}.${extension}`
  }
};