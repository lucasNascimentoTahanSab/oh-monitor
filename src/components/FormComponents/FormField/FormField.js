/**
 * @file Módulo responsável pela exibição de um campo em formulário ao usuário.
 * @copyright Lucas N. T. Sab 2023
 */
import React from 'react';
import Util from '../../../classes/util/Util.js';

function FormField(props) {
  return (
    <div className='tcc-form__field'>
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.id} name={props.name} type={props.type} onInput={event => Util.handle(props.onInput, event)} />
    </div>
  );
}

export default FormField;