/**
 * @file Módulo responsável pela criação do contexto TabContext para transmissão de informações quanto à
 * guia atual em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import { createContext } from 'react';

const TabContext = createContext(null);

export default TabContext;