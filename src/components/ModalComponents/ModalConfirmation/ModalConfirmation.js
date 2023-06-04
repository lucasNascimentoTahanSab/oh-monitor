/**
 * @file Módulo responsável pela exibição de modal de confirmação ao usuário.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import ButtonCross from '../../ButtonComponents/ButtonCross/ButtonCross';
import Util from '../../../classes/util/Util';
import ButtonConfirmation from '../../ButtonComponents/ButtonConfirmation/ButtonConfirmation';

function ModalConfirmation(props) {
  const [loading, setLoading] = useState(false);

  return (
    <ReactModal
      className='tcc-modal tcc-no-select'
      overlayClassName='tcc-modal__overlay'
      isOpen={props.isOpen}
      shouldFocusAfterRender={true}
      shouldReturnFocusAfterClose={false}
      onRequestClose={() => Util.handle(props.unmountModal)}
      appElement={props.app?.current}>
      <header>
        <h3>{props.modalConfirmationEvent?.title}</h3>
        <ButtonCross width='1.75rem' height='1.75rem' onClick={() => Util.handle(props.unmountModal)} />
      </header>
      <section>
        <div>
          <span>{props.modalConfirmationEvent?.message}</span>
        </div>
        <footer>
          <ButtonConfirmation value='Confirmar' loading={loading} onClick={() => Util.handle(props.modalConfirmationEvent?.action, setLoading)} />
        </footer>
      </section>
    </ReactModal>
  );
}

export default ModalConfirmation;