/**
 * @file Módulo responsável pela criação do contexto UserContext para transmissão de informações quanto ao
 * usuário atual.
 * @copyright Lucas N. T. Sab 2023
 */
import { createContext } from 'react';

const UserContext = createContext(null);

export default UserContext;