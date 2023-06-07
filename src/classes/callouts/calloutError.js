/**
 * @file Módulo responsável pela exibição de mensagens de erro em toast.
 * @copyright Lucas N. T. Sab 2023
 */
import ShowToastEvent from "../util/ShowModal/ShowToastEvent";

const calloutError = {
  content: error => new ShowToastEvent({ title: error?.name, message: error?.message, variant: 'error' }),
  code: error => new ShowToastEvent({ title: error?.name, message: error?.message, variant: 'error' })
};

export default calloutError;