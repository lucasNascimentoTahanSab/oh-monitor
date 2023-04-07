import React, { useContext } from 'react';
import ButtonExpand from '../../ButtonComponents/ButtonExpand/ButtonExpand';
import { FullscreenContext } from '../../Context/FullscreenContext/FullscreenContext';

function CodeEditorMenuSettings() {
  const [fullscreen, setFullscreen] = useContext(FullscreenContext);

  return (
    <div className='code-editor__menu-settings'>
      <ButtonExpand height='.875rem' width='.875rem' onClick={() => setFullscreen(!fullscreen)} />
    </div>
  );
}

export default CodeEditorMenuSettings;