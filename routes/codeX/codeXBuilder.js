const axios = require('axios');

function sortFilesByOrder(files, config) {
  if (!files?.length) { return null; }

  return config?.languages?.[config.language]?.sort === 'asc' ? sortFilesByOrderAsc(files) : sortFilesByOrderDesc(files);
}

function sortFilesByOrderAsc(files) {
  if (!files?.length) { return null; }

  return files.sort((firstFile, secondFile) => firstFile.order > secondFile.order ? 1 : -1);
}

function sortFilesByOrderDesc(files) {
  if (!files?.length) { return null; }

  return files.sort((firstFile, secondFile) => firstFile.order > secondFile.order ? -1 : 1);
}

function getFile(file, config) {
  return new Promise((resolve, reject) => {
    axios.request(getFileRequest(file, config))
      .then(response => resolve(response.json()))
      .catch(error => reject(error))
  })
}

function getFileRequest(file, config) {
  return {
    endpoint: `api/repo/${config?.language}${file?.alternativePath}.${config?.languages?.[config.language]?.extension}`,
    method: 'GET'
  }
}

module.exports = {
  async build(files, config) {
    return (await Promise.all(sortFilesByOrder(files, config)?.map(async file => {
      return file.alternativePath ? await getFile(file, config)?.data : file.code;
    }))).reduce((code, data) => `${code}${data}\n`, '');
  },
};