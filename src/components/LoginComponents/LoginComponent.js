import React, { useContext, useState } from 'react';
import ButtonConfirmation from '../ButtonComponents/ButtonConfirmation/ButtonConfirmation.js';
import UserContext from '../Context/UserContext/UserContext.js';
import ToastEventContext from '../Context/ToastEventContext/ToastEventContext.js';
import callouts from '../../classes/callouts/callout.js';
import calloutError from '../../classes/callouts/calloutError.js';

function LoginComponent() {
  const [, setToastEvent] = useContext(ToastEventContext);
  const [, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    getUser(event.target);
  }

  function getUser([username, email, password]) {
    callouts.content.postUser({ username: username.value, email: email.value, password: password.value })
      .then(result => updateUser(result))
      .catch(error => setToastEvent(calloutError.content(error)))
  }

  function updateUser(result) {
    setLoading(false);

    // Nem todos os erros ocorridos no servidor são recebidos em 'catch'.
    if (!result?.username) { return setToastEvent(calloutError.content(result)); }

    setUser(result);
  }

  return (
    <div className='tcc-classroom__section-container'>
      <div className='tcc-classroom__section tcc-login'>
        <header>
          <h1>Bem-vinda(o) ao Monitor!</h1>
        </header>
        <form className='tcc-login__form' onSubmit={handleSubmit}>
          <section className='tcc-login__form-fields'>
            <div className='tcc-login__form-item'>
              <label htmlFor='login-username'>Nome de usuário:</label>
              <input id='login-username' type='text' name='username' />
            </div>
            <div className='tcc-login__form-item'>
              <label htmlFor='login-email'>Email:</label>
              <input id='login-email' type='text' name='email' />
            </div>
            <div className='tcc-login__form-item'>
              <label htmlFor='login-password'>Senha:</label>
              <input id='login-password' type='password' name='password' />
            </div>
          </section>
          <div className='tcc-login__form-submit'>
            <ButtonConfirmation value='Confirmar' width='100%' loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;