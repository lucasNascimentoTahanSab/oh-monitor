import React, { useContext } from 'react';
import ButtonExpand from '../../ButtonComponents/ButtonExpand/ButtonExpand';
import ButtonPlay from '../../ButtonComponents/ButtonPlay/ButtonPlay';
import { FullscreenContext } from '../../Context/FullscreenContext/FullscreenContext';
import { callouts } from '../../../classes/callout';
import { util } from '../../../classes/util';

function CodeEditorMenuSettings(props) {
  const [fullscreen, setFullscreen] = useContext(FullscreenContext);

  async function sendCode() {
    if (typeof props.setResult !== 'function') { return; }

    props.setResult(await callouts.code.post({ code: util.getCodeFromFiles(props.files), language: 'c' }));
  }

  return (
    <div className='code-editor__menu-settings'>
      <ButtonPlay height='.875rem' width='.875rem' onClick={() => sendCode()} />
      <ButtonExpand height='.875rem' width='.875rem' onClick={() => setFullscreen(!fullscreen)} />
    </div>
  );
}

export default CodeEditorMenuSettings;