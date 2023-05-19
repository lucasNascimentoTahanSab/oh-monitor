/**
 * @file Módulo responsável pela exibição de code snippet em editor de código.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useState } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import CodeEditorWorkspace from '../CodeEditorWorkspace/CodeEditorWorkspace';
import CodeEditorPrompt from '../CodeEditorPrompt/CodeEditorPrompt';
import Element from '../../../classes/strapi/Element';

function CodeSnippet(props) {
  const [snippet, setSnippet] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);

  useEffect(() => {
    setCurrentElement(props.element);
    setSnippet(props.element?.snippet);
  }, [props.element]);

  /**
   * Método responsável pela atualização de snippet e correspondente em
   * elemento atual.
   * 
   * @param {object} snippet 
   */
  function updateSnippet(snippet) {
    const newCurrentElement = new Element({ ...currentElement, snippet });

    setCurrentElement(newCurrentElement);
  }

  return (
    <CodeEditor updateResult={() => { }} file={snippet} setFile={updateSnippet}>
      <CodeEditorWorkspace />
      <CodeEditorPrompt />
    </CodeEditor>
  );
}

export default CodeSnippet;