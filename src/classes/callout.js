import { requests } from "./calloutRequest";
import { endpoints } from "./calloutEndpoint";

export const callouts = {
  code: {
    post: async body => (
      new Promise((resolve, reject) => {
        fetch(endpoints.code.post, requests.code.post(body))
          .then(response => resolve(response.json()))
          .catch(error => reject(error))
      })
    )
  },
  content: {
    getSubject: async uuid => (
      new Promise((resolve, reject) => {
        fetch(endpoints.content.getSubject(uuid), requests.content.getSubject())
          .then(response => resolve(response.json()))
          .catch(error => reject(error))
      })
    )
  }
};