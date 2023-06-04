/**
 * @file Módulo responsável pela exibição de loading em tela.
 * @copyright Lucas N. T. Sab 2023
 */
import React from 'react';

function LoadingComponent(props) {
  function getClassName() {
    return `tcc-loading ${props.className ?? ''}`;
  }

  return (
    <div className={getClassName()} style={{ width: props.width, height: props.height }}>
      <div style={{ width: props.width, height: props.height }}></div>
      <div style={{ width: props.width, height: props.height }}></div>
      <div style={{ width: props.width, height: props.height }}></div>
      <div style={{ width: props.width, height: props.height }}></div>
    </div>
  );
}

export default LoadingComponent;