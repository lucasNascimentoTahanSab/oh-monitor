/**
 * @file Módulo responsável pela exibição do botão de confirmação.
 * @copyright Lucas N. T. Sab 2023
 */
import React from 'react';
import Util from '../../../classes/Util';

function ButtonConfirmation(props) {
  return (
    <button className='button--confirmation' onClick={event => Util.handle(props.onClick, event)}>
      {props.value}
    </button>
  );
}

export default ButtonConfirmation;