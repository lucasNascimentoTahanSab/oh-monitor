/**
 * @file Módulo responsável pela exibição da barra de redimensionamento.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useCallback, useEffect, useRef } from 'react';
import ButtonResize from '../ButtonComponents/ButtonResize/ButtonResize';

function ResizerComponent(props) {
  const resizerRef = useRef();

  const setResizerRefCallback = useCallback(ref => props.setResizerRef(ref), [props]);

  /**
   * Hook responsável por entregar referência ao redimensionador para o terminal.
   */
  useEffect(() => { setResizerRefCallback(resizerRef) }, [setResizerRefCallback]);

  return (
    <div className='tcc-code-editor-prompt__resizer' ref={resizerRef} onMouseDown={event => props.resizer?.resize?.(event)}>
      <ButtonResize width={props.width} height={props.height} color={props.color} onClick={() => props.resizer?.toggleResizer?.()} />
    </div>
  );
}

export default ResizerComponent;