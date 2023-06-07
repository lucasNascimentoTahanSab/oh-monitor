/**
 * @file Módulo responsável pela exibição e controle de barra de progresso.
 * @copyright Lucas N. T. Sab 2023
 */
import React from 'react';
import Util from '../../../classes/util/Util.js';

function InputRange(props) {
  return (
    <input
      className='tcc-input-range'
      type='range'
      step={1}
      min={0}
      max={props.max}
      value={props.value}
      onChange={event => Util.handle(props.onChange, event)}
      onMouseUp={event => Util.handle(props.onMouseUp, event)} />
  );
}

export default InputRange;