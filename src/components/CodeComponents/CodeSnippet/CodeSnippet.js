/**
 * @file Módulo responsável pela exibição de code snippet em editor de código.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import AnimationScreen from '../../AnimationComponents/AnimationScreen/AnimationScreen.js';
import PackageContext from '../../Context/PackageContext/PackageContext.js';
import RenderContext from '../../Context/RenderContext/RenderContext.js';
import SnippetsContext from '../../Context/SnippetsContext/SnippetsContext.js';
import Snippet from '../../../classes/strapi/Snippet.js';
import callouts from '../../../classes/callouts/callout.js';
import config from '../../../config.json';

function CodeSnippet(props) {
  const [snippets, setSnippets] = useContext(SnippetsContext);
  const [render, setRender] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [snippet, setSnippet] = useState(null);
  const [element, setElement] = useState(null);

  useEffect(() => setElement(props.element), [props.element]);

  const getSnippetCallback = useCallback(getSnippet, [getSnippet]);

  /**
   * Método responsável pela atualização do code snippet por repositório ou memória
   * primária, caso já tenha sido carregado.
   */
  async function getSnippet() {
    if (snippets.has(element.uid)) { setSnippet(snippets.get(element.uid)); }
    else { setSnippet(new Snippet(element, (await calloutSnippet())?.data)); }
  }

  async function calloutSnippet() {
    return await callouts.repo.getFile(element?.value, config.language, config.languages[config.language].extension)
  }

  /**
   * Hook responsável por atualizar editor de código com code snippet desejado. Caso o 
   * código já tenha sido carregado, sua recuperação é feita por meio de SnippetsContext
   * ao invés de uma chamada à integração.
   */
  useEffect(() => { if (!snippet && element) { getSnippetCallback(); } });

  const getSnippetsCallback = useCallback(getSnippets, [getSnippets]);

  function getSnippets() {
    if (snippets.has(element.uid)) { return; }

    snippets.set(element.uid, snippet);

    setSnippets(snippets);
  }

  /**
   * Hook responsável pela atualização dos code snippets mapeados.
   */
  useEffect(() => { if (snippet) { getSnippetsCallback() } }, [snippet, getSnippetsCallback]);

  function displayAnimationScreen() {
    return element?.displayAnimationScreen ? (<AnimationScreen theme='dark' />) : null;
  }

  return (
    <PackageContext.Provider value={[currentPackage, setCurrentPackage]}>
      <RenderContext.Provider value={[render, setRender]}>
        <div className='code-snippet'>
          <div className='code-snippet__editor'>
            <Editor
              theme='vs-dark'
              defaultLanguage={config.language}
              value={snippet?.content}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                padding: { bottom: 10, top: 10 }
              }}
            />
          </div>
          {displayAnimationScreen()}
        </div>
      </RenderContext.Provider>
    </PackageContext.Provider>
  );
}

export default CodeSnippet;