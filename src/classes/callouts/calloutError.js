import ShowToastEvent from "../util/ShowToastEvent";

const calloutError = {
  content: error => new ShowToastEvent(error?.name, error?.message, 'error')
};

export default calloutError;