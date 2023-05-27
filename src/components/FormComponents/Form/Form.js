/**
 * @file Módulo responsável pela apresentação de um formulário ao usuário.
 * @copyright Lucas N. T. Sab 2023
 */
import React from 'react';
import Util from '../../../classes/util/Util';

function Form(props) {
  return (
    <form className='tcc-form' method={props.method} onSubmit={event => Util.handle(props.onSubmit, event)}>
      {props.children}
    </form>
  );
}

export default Form;