/**
 * @file Módulo responsável pela exibição do menu de configurações do editor de códigos.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useState } from 'react';
import ButtonExpand from '../../ButtonComponents/ButtonExpand/ButtonExpand.js';
import ButtonPlay from '../../ButtonComponents/ButtonPlay/ButtonPlay.js';
import CodesContext from '../../Context/CodesContext/CodesContext.js';
import ResultContext from '../../Context/ResultContext/ResultContext.js';
import FullscreenContext from '../../Context/FullscreenContext/FullscreenContext.js';
import callouts from '../../../classes/callouts/callout.js';
import config from '../../../config.json';

function CodeEditorMenuSettings() {
  const [files,] = useContext(CodesContext);
  const [updateResult] = useContext(ResultContext);
  const [fullscreen, setFullscreen] = useContext(FullscreenContext);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
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
    callouts.code.post({ files: Array.from(files.values()), config }).then(getResult).catch(getResult);
  }

  function getResult(result) {
    updateResult(result);
    setLoading(false);
  }

  return (
    <div className='code-editor__menu-settings'>
      <ButtonPlay height='.875rem' width='.875rem' color='#3498DB' onClick={handleSend} loading={loading} />
      <ButtonExpand height='.875rem' width='.875rem' color='#3498DB' onClick={() => setFullscreen(!fullscreen)} />
    </div>
  );
}

export default CodeEditorMenuSettings;