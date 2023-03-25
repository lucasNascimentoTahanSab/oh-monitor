require('dotenv').config();

module.exports = {
  getSubjectRequest: req => {
    return {
      method: 'GET',
      url: `${process.env.ST_ENDPOINT}subjects/${req.params.subjectId}?populate[sections][populate][0]=elements&populate[sections][populate][1]=elements.elements&populate[exercises][populate][0]=answers`,
      headers: { 'Authorization': process.env.ST_TOKEN },
    };
  }
};