/**
 * @file Módulo responsável pela criação do contexto FileContext para transmissão de informações quanto ao
 * código atualmente carregado em tela.
 * @copyright Lucas N. T. Sab 2023
 */
import { createContext } from 'react';

const FileContext = createContext(null);

export default FileContext;