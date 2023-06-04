/**
 * @file Módulo responsável pela criação do contexto ModalEventContext para transmissão de informações quanto à
 * mensagem sendo exibida em modal.
 * @copyright Lucas N. T. Sab 2023
 */
import { createContext } from 'react';

const ModalEventContext = createContext(null);

export default ModalEventContext;