import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import AnimationScreen from '../../AnimationComponents/AnimationScreen/AnimationScreen';
import { callouts } from '../../../classes/callout';

function CodeSnippet(props) {
  const [snippet, setSnippet] = useState(null);

  useEffect(() => { if (!snippet) { getSnippet(); } });

  async function getSnippet() {
    setSnippet((await callouts.repo.getFile(props.element?.attributes?.value, 'c', 'c'))?.data ?? snippet);
  }

  function displayAnimationScreen() {
    return props.element?.attributes?.displayAnimationScreen ? (<AnimationScreen theme='dark' />) : null;
  }

  return (
    <div className='code-snippet'>
      <div className='code-snippet__editor'>
        <Editor
          theme='vs-dark'
          defaultLanguage='c'
          value={snippet}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            padding: { bottom: 10, top: 10 }
          }}
        />
      </div>
      {displayAnimationScreen()}
    </div>
  );
}

export default CodeSnippet;