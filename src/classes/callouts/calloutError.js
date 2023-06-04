import ShowToastEvent from "../util/ShowModal/ShowToastEvent";

const calloutError = {
  content: error => new ShowToastEvent({ title: error?.name, message: error?.message, variant: 'error' }),
  code: error => new ShowToastEvent({ title: error?.name, message: error?.message, variant: 'error' })
};

export default calloutError;