/**
 * @file Módulo responsável pela exibição de code snippet em editor de código.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import AnimationScreen from '../../AnimationComponents/AnimationScreen/AnimationScreen';
import callouts from '../../../classes/callout';
import config from '../../../config.json';
import SnippetsContext from '../../Context/SnippetsContext/SnippetsContext';

function CodeSnippet(props) {
  const [snippets, setSnippets] = useContext(SnippetsContext);
  const [snippet, setSnippet] = useState(null);
  const [element, setElement] = useState(null);

  useEffect(() => setElement(props.element), [props.element]);

  const getSnippetCallback = useCallback(getSnippet, [getSnippet]);

  /**
   * Método responsável pela atualização do code snippet por repositório ou memória
   * primária, caso já tenha sido carregado.
   */
  async function getSnippet() {
    const newSnippet = snippets.has(element?.value) ? snippets.get(element?.value) : (await calloutSnippet())?.data;

    if (!snippets.has(element?.value)) { updateSnippets(newSnippet); }

    setSnippet(newSnippet);
  }

  function updateSnippets(newSnippet) {
    snippets.set(element?.value, newSnippet);

    setSnippets(snippets);
  }

  async function calloutSnippet() {
    return await callouts.repo.getFile(element?.value, config.language, config.languages[config.language].extension)
  }

  /**
   * Hook responsável por atualizar editor de código com code snippet desejado. Caso o 
   * código já tenha sido carregado, sua recuperação é feita por meio de SnippetsContext
   * ao invés de uma chamada à integração.
   */
  useEffect(() => { if (!snippet && element) { getSnippetCallback(); } }, [snippet, element, getSnippetCallback]);

  function displayAnimationScreen() {
    return element?.displayAnimationScreen ? (<AnimationScreen theme='dark' />) : null;
  }

  return (
    <div className='code-snippet'>
      <div className='code-snippet__editor'>
        <Editor
          theme='vs-dark'
          defaultLanguage={config.language}
          value={snippet}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            padding: { bottom: 10, top: 10 }
          }}
        />
      </div>
      {displayAnimationScreen()}
    </div>
  );
}

export default CodeSnippet;