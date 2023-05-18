/**
 * @file Módulo responsável pela exibição do menu de configurações do editor de códigos.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useState } from 'react';
import ButtonExpand from '../../ButtonComponents/ButtonExpand/ButtonExpand.js';
import ButtonPlay from '../../ButtonComponents/ButtonPlay/ButtonPlay.js';
import TabContext from '../../Context/TabContext/TabContext.js';
import CodesContext from '../../Context/CodesContext/CodesContext.js';
import CodeContext from '../../Context/CodeContext/CodeContext.js';
import FullscreenContext from '../../Context/FullscreenContext/FullscreenContext.js';
import callouts from '../../../classes/callouts/callout.js';
import config from '../../../config.json';

function CodeEditorMenuSettings(props) {
  const [currentTab, setCurrentTab] = useContext(TabContext);
  const [codes,] = useContext(CodesContext);
  const [currentCode, setCurrentCode] = useContext(CodeContext);
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
    callouts.code.post({ codes, config }).then(getResult).catch(getResult);
  }

  function getResult(result) {
    setCurrentCode({ ...currentCode, result });
    setLoading(false);
    setCurrentTab({ ...currentTab, loading: false });
  }

  function getButtonPlay() {
    return props.showButtonPlay ? <ButtonPlay height='.875rem' width='.875rem' color='#3498DB' onClick={handleSend} loading={loading} /> : null;
  }

  return (
    <div className='code-editor__menu-settings'>
      {getButtonPlay()}
      <ButtonExpand height='.875rem' width='.875rem' color='#3498DB' onClick={() => setFullscreen(!fullscreen)} />
    </div>
  );
}

export default CodeEditorMenuSettings;