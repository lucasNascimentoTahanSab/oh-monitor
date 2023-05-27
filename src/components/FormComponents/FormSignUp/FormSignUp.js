import React, { useContext, useState } from 'react';
import ButtonConfirmation from '../../ButtonComponents/ButtonConfirmation/ButtonConfirmation.js';
import ToastEventContext from '../../Context/ToastEventContext/ToastEventContext.js';
import callouts from '../../../classes/callouts/callout.js';
import calloutError from '../../../classes/callouts/calloutError.js';
import Form from '../Form/Form.js';
import FormField from '../FormField/FormField.js';

function FormSignUp() {
  const [, setToastEvent] = useContext(ToastEventContext);
  const [loading, setLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();

    setLoading(true);
    signUp(event.target);
  }

  function signUp([username, email, password]) {
    callouts.content.signUp({ username: username.value, email: email.value, password: password.value })
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
    if (result.error) { return setToastEvent(calloutError.content(result.error)); }

    window.location.href = '/tcle';
  }

  return (
    <div className='tcc-classroom__section-container'>
      <div className='tcc-classroom__section tcc-sign-up'>
        <header>
          <h1>Bem-vinda(o) ao Monitor!</h1>
        </header>
        <Form method='POST' onSubmit={onSubmit}>
          <section className='tcc-form__fields'>
            <FormField id='sign-username' name='username' type='text' label='Nome de usuário:' />
            <FormField id='sign-email' name='email' type='text' label='Email:' />
            <FormField id='sign-password' name='password' type='password' label='Senha:' />
          </section>
          <div className='tcc-form__submit'>
            <ButtonConfirmation value='Confirmar' width='100%' loading={loading} />
            <span>Já possui conta? Clique <a href='/signin'>aqui</a>.</span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default FormSignUp;