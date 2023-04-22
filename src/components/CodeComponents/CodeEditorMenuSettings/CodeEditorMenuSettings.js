import React, { useContext } from 'react';
import ButtonExpand from '../../ButtonComponents/ButtonExpand/ButtonExpand';
import ButtonPlay from '../../ButtonComponents/ButtonPlay/ButtonPlay';
import { FullscreenContext } from '../../Context/FullscreenContext/FullscreenContext';
import { callouts } from '../../../classes/callout';
import { ConfigContext } from '../../Context/ConfigContext/ConfigContext';

function CodeEditorMenuSettings(props) {
  const config = useContext(ConfigContext);
  const [fullscreen, setFullscreen] = useContext(FullscreenContext);

  async function sendCode() {
    if (typeof props.setResult !== 'function') { return; }

    props.setResult(await callouts.code.post({ files: props.files, config }));
  }

  return (
    <div className='code-editor__menu-settings'>
      <ButtonPlay height='.875rem' width='.875rem' onClick={() => sendCode()} />
      <ButtonExpand height='.875rem' width='.875rem' onClick={() => setFullscreen(!fullscreen)} />
    </div>
  );
}

export default CodeEditorMenuSettings;