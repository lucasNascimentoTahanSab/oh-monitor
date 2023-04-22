require('dotenv').config();

module.exports = {
  getRequest(url) {
    return {
      method: 'GET',
      url: `${process.env.GH_ENDPOINT}/repos/${process.env.GH_OWNER}/${process.env.GH_REPO}/contents${url}`,
      headers: {
        'Authorization': process.env.GH_TOKEN,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': process.env.GH_VERSION
      }
    };
  },
  getRequestFor(url) {
    return {
      method: 'GET',
      url,
      headers: {
        'Authorization': process.env.GH_TOKEN,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': process.env.GH_VERSION
      }
    };
  }
};