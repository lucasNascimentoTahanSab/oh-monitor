/**
 * @file Módulo responsável pelo controle de exibição de um modal em tela.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useState } from 'react';
import Util from '../../../classes/util/Util.js';

function Modal(props) {
  const [modalEvent, setModalEvent] = useState(null);
  const [showModalEvent, setShowModalEvent] = useState(false);

  useEffect(() => { setModalEvent(props.modalEvent) }, [props.modalEvent]);

  useEffect(() => { setShowModalEvent(props.showModalEvent) }, [props.showModalEvent]);

  /**
   * Hook responsável pela apresentação de toast ao usuário quando evento
   * disparado internamente.
   */
  useEffect(() => {
    if (!modalEvent && showModalEvent) { return Util.handle(props.unmount); }
    if (!modalEvent) { return; }
    if (showModalEvent) { return; }

    modalEvent.show(props.setModalEvent, props.setShowModalEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalEvent]);

  function getToastEvent() {
    return showModalEvent ? props.children : null;
  }

  return (
    <div style={{ position: 'absolute' }}>{getToastEvent()}</div>
  );
}

export default Modal;