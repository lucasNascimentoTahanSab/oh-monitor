/**
 * @file Módulo responsável pela exibição do botão de redimensionamento.
 * @copyright Lucas N. T. Sab 2023
 */
import React from 'react';
import Util from '../../../classes/util/Util.js';

function ButtonResize(props) {
  return (
    <button onClick={event => Util.handle(props.onClick, event)}>
      <svg width={props.width} height={props.height} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 6.87537H0V8.12537H15V6.87537Z" fill={props.color} />
        <path d="M15 2.50018H0V3.75018H15V2.50018Z" fill={props.color} />
        <path d="M15 11.25H0V12.5H15V11.25Z" fill={props.color} />
      </svg>
    </button>
  );
}

export default ButtonResize;