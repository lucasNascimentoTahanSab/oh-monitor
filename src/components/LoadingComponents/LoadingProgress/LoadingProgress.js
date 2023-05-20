/**
 * @file Módulo responsável pela exibição de barra de carregamento.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useCallback, useEffect, useRef } from 'react';

function LoadingProgress(props) {
  const progressRef = useRef(null);

  const updateProgressCallback = useCallback(updateProgress, [updateProgress]);

  /**
   * Método responsável pela atualização do progresso em barra de carregamento.
   * 
   * @returns 
   */
  function updateProgress() {
    if (typeof props.progress !== 'number') { return; }
    if (typeof props.max !== 'number') { return; }

    progressRef.current.style.height = `${Math.ceil((props.progress / props.max) * 100)}%`;
  }

  useEffect(() => { updateProgressCallback(props.progress) }, [props.progress, updateProgressCallback]);

  return (
    <div className='tcc-loading-progress'>
      <div className='tcc-loading-progress__fill' ref={progressRef}>
      </div>
    </div>
  );
}

export default LoadingProgress;