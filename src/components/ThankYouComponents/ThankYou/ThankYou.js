/**
 * @file Módulo responsável pela apresentação de página de agradecimento após utilização da
 * plataforma.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect } from 'react';
import Util from '../../../classes/util/Util';

function ThankYou(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { Util.handle(props.setUser, { ...props.user, screen: window.location.pathname }); }, []);

  return (
    <div className='tcc-thank-you__container'>
      <div className='tcc-thank-you'>
        <header>
          <h1>Obrigado por utilizar o Monitor!</h1>
        </header>
      </div>
    </div>
  );
}

export default ThankYou;