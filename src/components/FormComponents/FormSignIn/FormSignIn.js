/**
 * @file Módulo responsável pela apresentação do formulário de entrada do usuário na plataforma.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useState } from 'react';
import Form from '../Form/Form.js';
import FormField from '../FormField/FormField.js';
import ButtonConfirmation from '../../ButtonComponents/ButtonConfirmation/ButtonConfirmation.js';
import ToastEventContext from '../../Context/ToastEventContext/ToastEventContext.js';
import callouts from '../../../classes/callouts/callout.js';
import calloutError from '../../../classes/callouts/calloutError.js';
import Util from '../../../classes/util/Util.js';

function FormSignIn() {
  const [, setToastEvent] = useContext(ToastEventContext);
  const [loading, setLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();

    setLoading(true);
    signIn(event.target);
  }

  /**
   * Método responsável pela entrada do usuário na plataforma, enviando identificador
   * (nome de usuário ou email) e senha na operação.
   * 
   * @param {array} param0 
   */
  function signIn([identifier, password]) {
    callouts.content.signIn({ identifier: identifier.value })
      .then(result => redirectUser(result))
      .catch(error => showError(error));
  }

  function showError(error) {
    setLoading(false);
    setToastEvent(calloutError.content(error));
  }

  function redirectUser(result) {
    setLoading(false);

    // Nem todos os erros ocorridos no servidor são recebidos em 'catch'.
    if (result?.error) { return setToastEvent(calloutError.content(result.error)); }

    window.location.href = '/tcle';
  }

  return (
    <div className='tcc-sign-in__container'>
      <div className='tcc-sign-in'>
        <header>
          <h1>Bem-vinda(o) de volta!</h1>
        </header>
        <Form method='POST' onSubmit={onSubmit}>
          <section className='tcc-form__fields'>
            <FormField id='sign-identifier' name='identifier' type='text' label='Nome ou email:' />
          </section>
          <div className='tcc-form__submit'>
            <ButtonConfirmation value='Entrar' width='100%' loading={loading} />
            <span>Ainda não possui uma conta? Clique <a href='/signup'>aqui</a>.</span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default FormSignIn;