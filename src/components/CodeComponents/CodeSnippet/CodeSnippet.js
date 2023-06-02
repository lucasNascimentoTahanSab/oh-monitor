/**
 * @file Módulo responsável pela exibição de code snippet em editor de código.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import UserContext from '../../Context/UserContext/UserContext';
import CodeEditorWorkspace from '../CodeEditorWorkspace/CodeEditorWorkspace';
import CodeEditorPrompt from '../CodeEditorPrompt/CodeEditorPrompt';
import ElementsContext from '../../Context/ElementsContext/ElementsContext.js';
import Element from '../../../classes/strapi/Element';
import Util from '../../../classes/util/Util';

function CodeSnippet(props) {
  const [user, setUser] = useContext(UserContext);
  const [elements, setElements] = useContext(ElementsContext);
  const [snippet, setSnippet] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);

  useEffect(() => {
    setCurrentElement(props.element);
    setSnippet(props.element?.snippet);
  }, [props.element]);

  /**
   * Método repsonsável por atualizar elemento dentre demais elementos da seção atual.
   * 
   * @param {object} element 
   */
  function updateCurrentElement(element) {
    Util.updateItemIn(elements, setElements)(element);
  }

  /**
   * Método responsável pela atualização de snippet e correspondente em
   * elemento atual.
   * 
   * @param {object} snippet 
   */
  function updateSnippet(snippet) {
    const newCurrentElement = new Element({ ...currentElement, snippet });

    updateCurrentElement(newCurrentElement);
    updateUserStateWithSnippet(snippet);
  }

  /**
   * Método responsável pela atualização de snippet em estado do usuário
   * para registro.
   * 
   * @param {object} snippet 
   */
  function updateUserStateWithSnippet(snippet) {
    user.state.snippets.set(snippet.uid, snippet);

    setUser({ ...user, state: { ...user.state, snippets: user.state.snippets } });
  }

  return (
    <CodeEditor updateResult={() => { }} file={snippet} setFile={updateSnippet}>
      <CodeEditorWorkspace />
      <CodeEditorPrompt />
    </CodeEditor>
  );
}

export default CodeSnippet;