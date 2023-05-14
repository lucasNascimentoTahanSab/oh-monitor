/**
 * @file Módulo responsável pela exibição do botão de confirmação.
 * @copyright Lucas N. T. Sab 2023
 */
import React from 'react';
import util from '../../../classes/util';

function ButtonConfirmation(props) {
  return (
    <button className='button--confirmation' onClick={event => util.handle(props.onClick, event)}>
      {props.value}
    </button>
  );
}

export default ButtonConfirmation;