/**
 * @file Módulo responsável pela exibição de code snippet em editor de código.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import CodeEditorFile from '../CodeEditorFile/CodeEditorFile.js';
import ButtonExpand from '../../ButtonComponents/ButtonExpand/ButtonExpand.js';
import AnimationScreen from '../../AnimationComponents/AnimationScreen/AnimationScreen.js';
import RenderContext from '../../Context/RenderContext/RenderContext.js';
import SnippetsContext from '../../Context/SnippetsContext/SnippetsContext.js';
import Snippet from '../../../classes/strapi/Snippet.js';
import Fullscreen from '../../../classes/util/Fullscreen.js';
import callouts from '../../../classes/callouts/callout.js';
import config from '../../../config.json';

function CodeSnippet(props) {
  const [snippets, setSnippets] = useContext(SnippetsContext);
  const [fullscreen, setFullscreen] = useState(false);
  const [snippet, setSnippet] = useState(null);
  const [element, setElement] = useState(null);
  const [render, setRender] = useState(false);
  const snippetRef = useRef(null);

  useEffect(() => {
    if (fullscreen) { Fullscreen.open(snippetRef.current); }
    else { Fullscreen.close(); }
  }, [fullscreen]);

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
    return await callouts.repo.getCode(element.value, config.language, config.languages[config.language].extension)
  }

  /**
   * Hook responsável por atualizar editor de código com code snippet desejado. Caso o 
   * código já tenha sido carregado, sua recuperação é feita por meio de SnippetsContext
   * ao invés de uma chamada à integração.
   */
  useEffect(() => { if (!snippet && element) { getSnippetCallback(); } });

  const getSnippetsCallback = useCallback(getSnippets, [getSnippets]);

  function getSnippets() {
    if (snippets.has(snippet.uid)) { return; }

    snippets.set(snippet.uid, snippet);

    setSnippets(snippets);
  }

  /**
   * Hook responsável pela atualização dos code snippets mapeados.
   */
  useEffect(() => { if (snippet) { getSnippetsCallback() } }, [snippet, getSnippetsCallback]);

  return (
    <RenderContext.Provider value={[render, setRender]}>
      <div className='code-snippet' ref={snippetRef}>
        <div className='code-editor__menu'>
          <div></div>
          <div className='code-editor__menu-settings'>
            <ButtonExpand height='.875rem' width='.875rem' color='#3498DB' onClick={() => setFullscreen(!fullscreen)} />
          </div>
        </div>
        <div className='code-snippet__inner'>
          <CodeEditorFile className='code-snippet__file' code={snippet} minimap={false} />
          <AnimationScreen commands={snippet?.commands} />
        </div>
      </div>
    </RenderContext.Provider>
  );
}

export default CodeSnippet;