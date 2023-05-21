/**
 * @file Módulo responsável pela exibição do conteúdo do terminal no editor de códigos.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import OutputContext from '../../Context/OutputContext/OutputContext.js';
import InputContext from '../../Context/InputContext/InputContext.js';

function CodeEditorPromptContent(props) {
  const [output,] = useContext(OutputContext);
  const [input,] = useContext(InputContext);
  const [current, setCurrent] = useState(null);
  const contentRef = useRef();
  const innerRef = useRef();

  useEffect(() => { setCurrent(props.current) }, [props]);

  const setContentRefCallback = useCallback(ref => props.setContentRef(ref), [props]);

  /**
   * Hook responsável por entregar referência ao conteúdo para o terminal.
   */
  useEffect(() => { setContentRefCallback(contentRef) }, [setContentRefCallback]);

  const scrollToBottomCallback = useCallback(scrollToBottom, [scrollToBottom]);

  function scrollToBottom() {
    const innerBounding = innerRef.current.getBoundingClientRect();

    innerRef.current.scroll(0, innerBounding.bottom);
  }

  /**
   * Hook responsável por redirecionar cliente ao final do conteúdo do terminal
   * quando conteúdo atualizado.
   */
  useEffect(() => { scrollToBottomCallback() }, [innerRef, scrollToBottomCallback]);

  function getContent() {
    if (current?.allowOutput) { return output; }
    if (current?.allowInput) { return input; }

    return null;
  }

  return (
    <div className='tcc-code-editor-prompt-content' ref={contentRef}>
      <div className='tcc-code-editor-prompt-content__inner' ref={innerRef}>
        {getContent()}
      </div>
    </div>
  );
}

export default CodeEditorPromptContent;