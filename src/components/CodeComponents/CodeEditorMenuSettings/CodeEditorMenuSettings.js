/**
 * @file Módulo responsável pela exibição do menu de configurações do editor de códigos.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext } from 'react';
import ButtonExpand from '../../ButtonComponents/ButtonExpand/ButtonExpand';
import ButtonPlay from '../../ButtonComponents/ButtonPlay/ButtonPlay';
import { FullscreenContext } from '../../Context/FullscreenContext/FullscreenContext';
import callouts from '../../../classes/callout';
import config from '../../../config.json';
import util from '../../../classes/util';

function CodeEditorMenuSettings(props) {
  const [fullscreen, setFullscreen] = useContext(FullscreenContext);

  /**
   * Método responsável pelo envio do código desenvolvido ao compilador e obtenção do
   * resultado retornado.
   * 
   * @returns {object}
   */
  async function sendCode() {
    return await callouts.code.post({ files: props.files, config });
  }

  return (
    <div className='code-editor__menu-settings'>
      <ButtonPlay height='.875rem' width='.875rem' color='#3498DB' onClick={async () => util.handle(props.setResult, await sendCode())} />
      <ButtonExpand height='.875rem' width='.875rem' color='#3498DB' onClick={() => setFullscreen(!fullscreen)} />
    </div>
  );
}

export default CodeEditorMenuSettings;