import React from 'react';
import Editor from '@monaco-editor/react';
import AnimationScreen from '../../AnimationComponents/AnimationScreen/AnimationScreen';

function CodeSnippet(props) {
  function displayAnimationScreen() {
    return props?.displayAnimationScreen
      ? (<AnimationScreen theme='dark' />)
      : null;
  }

  return (
    <div className='code-snippet'>
      <div className='code-snippet__editor'>
        <Editor
          theme='vs-dark'
          defaultLanguage='c++'
          value={props.value}
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