/**
 * @file Módulo responsável pela criação do contexto PromisesContext para verificar quando Promises
 * cumpridas.
 * @copyright Lucas N. T. Sab 2023
 */
import { createContext } from 'react';

const PromisesContext = createContext(null);

export default PromisesContext;