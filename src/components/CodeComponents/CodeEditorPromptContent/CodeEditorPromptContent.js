/**
 * @file Módulo responsável pela exibição do conteúdo do terminal no editor de códigos.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import OutputContext from '../../Context/OutputContext/OutputContext';
import InputContext from '../../Context/InputContext/InputContext';

function CodeEditorPromptContent(props) {
  const [output,] = useContext(OutputContext);
  const [input,] = useContext(InputContext);
  const [current, setCurrent] = useState(null);
  const contentRef = useRef();

  useEffect(() => { setCurrent(props.current) }, [props]);

  const setContentRefCallback = useCallback(ref => props.setContentRef(ref), [props]);

  useEffect(() => { setContentRefCallback(contentRef) }, [setContentRefCallback]);

  return (
    <div className='prompt__content-inner' ref={contentRef}>
      <div className='prompt__content-inner-container'>
        {current?.uuid === 'output' ? output : input}
      </div>
    </div>
  );
}

export default CodeEditorPromptContent;