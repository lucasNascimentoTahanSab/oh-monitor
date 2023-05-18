/**
 * @file Módulo responsável pela criação do contexto ToastEventContext para transmissão de informações quanto à
 * mensagem sendo exibida em toast.
 * @copyright Lucas N. T. Sab 2023
 */
import { createContext } from 'react';

const ToastEventContext = createContext(null);

export default ToastEventContext;