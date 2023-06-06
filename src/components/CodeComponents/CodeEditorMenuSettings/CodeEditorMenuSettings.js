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
import ButtonReload from '../../ButtonComponents/ButtonReload/ButtonReload.js';

function CodeEditorMenuSettings() {
  const [, setToastEvent] = useContext(ToastEventContext);
  const [file, setFile, reloadCodes, updateCodesFromOrigin] = useContext(FileContext);
  const [currentTab, setCurrentTab] = useContext(TabContext);
  const [codes,] = useContext(CodesContext);
  const [fullscreen, setFullscreen] = useContext(FullscreenContext);
  const [loadingPlay, setLoadingPlay] = useState(false);
  const [loadingReload, setLoadingReload] = useState(false);

  function handleSend() {
    setCurrentTab({ ...currentTab, loading: true });
    setLoadingPlay(true);
    sendCode();
  }

  /**
   * Método responsável pelo recarregamento dos códigos do arquivo atual pela origem.
   */
  function handleReload() {
    setLoadingReload(true);

    reloadCodes().then(afterReload).catch();
  }

  function afterReload(codes) {
    updateCodesFromOrigin(codes);
    setLoadingReload(false);
  }

  /**
   * Método responsável pelo envio do código desenvolvido ao compilador e obtenção do
   * resultado retornado.
   * 
   * @returns {object}
   */
  function sendCode() {
    callouts.code.post({ codes, config, input: file?.args })
      .then(result => getResult(result))
      .catch(error => showError(error));
  }

  function showError(error) {
    setLoadingPlay(false);
    setCurrentTab({ ...currentTab, loading: false });
    setToastEvent(calloutError.code(error));
  }

  function getResult(result) {
    setLoadingPlay(false);
    setCurrentTab({ ...currentTab, loading: false });
    setFile({ ...file, result });
  }

  return (
    <div className='tcc-code-editor-menu-settings'>
      <ButtonReload height='.875rem' width='.875rem' color='#3498DB' onClick={handleReload} loading={loadingReload} />
      <ButtonPlay height='.875rem' width='.875rem' color='#3498DB' onClick={handleSend} loading={loadingPlay} />
      <ButtonExpand height='.875rem' width='.875rem' color='#3498DB' onClick={() => setFullscreen(!fullscreen)} />
    </div>
  );
}

export default CodeEditorMenuSettings;