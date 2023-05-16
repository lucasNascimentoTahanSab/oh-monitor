/**
 * @file Módulo responsável pela criação do contexto SnippetsContext para transmissão de informações quanto aos
 * code snippets já carregados.
 * @copyright Lucas N. T. Sab 2023
 */
import { createContext } from 'react';

const SnippetsContext = createContext(null);

export default SnippetsContext;