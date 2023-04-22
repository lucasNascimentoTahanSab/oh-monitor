const { getFile } = require('../gitHub/gitHubRouter.js');

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

function getAlternativeFile(url) {
  return new Promise((resolve, reject) =>
    getFile(url)
      .then(response => resolve({ data: response.data }))
      .catch(error => reject(error))
  );
}

function getAlternativeFileEndpoint(file, config) {
  return `/${config?.language}${file?.alternativePath}.${config?.languages?.[config.language]?.extension}`
}

module.exports = {
  async build(files, config) {
    return (await Promise.all(sortFilesByOrder(files, config)?.map(async file => {
      return file.alternativePath ? (await getAlternativeFile(getAlternativeFileEndpoint(file, config)))?.data : file.code;
    }))).reduce((code, data) => `${code}${data}\n`, '');
  },
};