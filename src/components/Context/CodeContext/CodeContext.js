/**
 * @file Módulo responsável pela criação do contexto CodeContext para transmissão de informações quanto ao
 * código atualmente carregado em tela.
 * @copyright Lucas N. T. Sab 2023
 */
import { createContext } from 'react';

const CodeContext = createContext(null);

export default CodeContext;