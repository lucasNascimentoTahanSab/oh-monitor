/**
 * @file Módulo responsável pela criação do contexto AnswerContext para transmissão de informações quanto às
 * respostas dadas aos exercícios propostos.
 * @copyright Lucas N. T. Sab 2023
 */
import { createContext } from 'react';

const AnswerContext = createContext(null);

export default AnswerContext;