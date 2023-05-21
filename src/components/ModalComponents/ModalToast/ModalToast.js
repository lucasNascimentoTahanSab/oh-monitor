/**
 * @file Módulo responsável pela exibição de toast ao usuário.
 * @copyright Lucas N. T. Sab 2023
 */
import React from 'react';
import ReactModal from 'react-modal';
import ButtonCross from '../../ButtonComponents/ButtonCross/ButtonCross';
import Util from '../../../classes/util/Util';

function ModalToast(props) {
  function getModalToastClass() {
    return `modal-toast ${getModalToastAditionalStyle()} no-select`;
  }

  function getModalToastAditionalStyle() {
    if (props.toastEvent?.variant === 'info') { return 'modal-toast--info'; }
    if (props.toastEvent?.variant === 'error') { return 'modal-toast--error'; }
    if (props.toastEvent?.variant === 'success') { return 'modal-toast--success'; }
  }

  return (
    <ReactModal
      className={getModalToastClass()}
      overlayClassName='modal-toast__overlay'
      isOpen={props.isOpen}
      shouldFocusAfterRender={true}
      shouldReturnFocusAfterClose={false}
      onRequestClose={() => Util.handle(props.unmountToast)}
      appElement={props.app?.current}>
      <header>
        <h3>{props.toastEvent?.title}</h3>
        <ButtonCross width='1.5rem' height='1.5rem' onClick={() => Util.handle(props.unmountToast)} />
      </header>
      <section className='modal-toast__section'>
        <div>
          <span>{props.toastEvent?.message}</span>
        </div>
      </section>
    </ReactModal>
  );
}

export default ModalToast;