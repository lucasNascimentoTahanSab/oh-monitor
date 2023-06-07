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

  function getClassName() {
    return `${props.vertical ? 'tcc-resizer--vertical' : 'tcc-resizer--horizontal'}`;
  }

  return (
    <div className={getClassName()} ref={resizerRef} onMouseDown={event => props.resizer?.resize?.(event)}>
      <ButtonResize width={props.width} height={props.height} color={props.color} onClick={event => props.resizer?.toggleResizer?.(event)} />
    </div>
  );
}

export default ResizerComponent;