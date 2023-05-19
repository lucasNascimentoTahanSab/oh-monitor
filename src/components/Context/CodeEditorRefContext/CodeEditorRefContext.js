/**
 * @file Módulo responsável pela criação do contexto CodeEditorRefContext para referenciar editor em 
 * redimensionamentos do monaco.editor.
 * @copyright Lucas N. T. Sab 2023
 */
import { createContext } from 'react';

const CodeEditorRefContext = createContext(null);

export default CodeEditorRefContext;