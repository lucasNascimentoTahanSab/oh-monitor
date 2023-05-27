/**
 * @file Módulo responsável pela exibição do menu de configurações do editor de códigos.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useState } from 'react';
import ButtonExpand from '../../ButtonComponents/ButtonExpand/ButtonExpand.js';
import ButtonPlay from '../../ButtonComponents/ButtonPlay/ButtonPlay.js';
import TabContext from '../../Context/TabContext/TabContext.js';
import CodesContext from '../../Context/CodesContext/CodesContext.js';
import FullscreenContext from '../../Context/FullscreenContext/FullscreenContext.js';
import ToastEventContext from '../../Context/ToastEventContext/ToastEventContext.js';
import callouts from '../../../classes/callouts/callout.js';
import calloutError from '../../../classes/callouts/calloutError.js';
import config from '../../../config.json';
import FileContext from '../../Context/FileContext/FileContext.js';

function CodeEditorMenuSettings(props) {
  const [, setToastEvent] = useContext(ToastEventContext);
  const [file, setFile] = useContext(FileContext);
  const [currentTab, setCurrentTab] = useContext(TabContext);
  const [codes,] = useContext(CodesContext);
  const [fullscreen, setFullscreen] = useContext(FullscreenContext);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    setCurrentTab({ ...currentTab, loading: true });
    setLoading(true);
    sendCode();
  }

  /**
   * Método responsável pelo envio do código desenvolvido ao compilador e obtenção do
   * resultado retornado.
   * 
   * @returns {object}
   */
  function sendCode() {
    callouts.code.post({ codes, config })
      .then(result => getResult(result))
      .catch(error => showError(error));
  }

  function showError(error) {
    setLoading(false);
    setCurrentTab({ ...currentTab, loading: false });
    setToastEvent(calloutError.code(error));
  }

  function getResult(result) {
    setLoading(false);
    setCurrentTab({ ...currentTab, loading: false });

    // Nem todos os erros ocorridos no servidor são recebidos em 'catch'.
    if (result.error) { return setToastEvent(calloutError.code(result.error)); }

    setFile({ ...file, result });
  }

  function getButtonPlay() {
    return props.showButtonPlay ? <ButtonPlay height='.875rem' width='.875rem' color='#3498DB' onClick={handleSend} loading={loading} /> : null;
  }

  return (
    <div className='tcc-code-editor-menu-settings'>
      {getButtonPlay()}
      <ButtonExpand height='.875rem' width='.875rem' color='#3498DB' onClick={() => setFullscreen(!fullscreen)} />
    </div>
  );
}

export default CodeEditorMenuSettings;