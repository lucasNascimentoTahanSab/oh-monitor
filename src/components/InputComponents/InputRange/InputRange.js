/**
 * @file Módulo responsável pela exibição e controle de barra de progresso.
 * @copyright Lucas N. T. Sab 2023
 */
import React from 'react';
import { util } from '../../../classes/util';

function InputRange(props) {
  function getThemeClass() {
    return props.theme === 'dark' ? 'progress-bar--light' : 'progress-bar--dark';
  }

  return (
    <input
      className={`progress-bar ${getThemeClass()}`}
      type='range'
      step={1}
      min={0}
      max={props.max}
      value={props.value}
      onChange={event => util.handle(event, props.onChange)}
      onMouseUp={event => util.handle(event, props.onMouseUp)} />
  );
}

export default InputRange;