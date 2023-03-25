import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import AnimationScreen from '../AnimationScreen/AnimationScreen';
import CodeEditorOutput from '../CodeEditorOutput/CodeEditorOutput';
import ButtonConfirmation from '../ButtonConfirmation/ButtonConfirmation';

function CodeEditor(props) {
  const editorRef = useRef(null);

  function sendCode() {
    fetch('/api/code/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: editorRef.current.getValue(), language: 'java' })
    })
      .then(result => result.json())
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }

  function handleEditorDidMount(editor,) {
    editorRef.current = editor;
  }

  return (
    <div className='code-editor'>
      <ButtonConfirmation value='Enviar' onClick={sendCode} />
      <div className='code-editor__inner'>
        <Editor
          height={'34.6875rem'}
          defaultLanguage='java'
          value={props.value}
          theme='vs-dark'
          onMount={handleEditorDidMount}
          options={{
          }}
        />
        <AnimationScreen />
      </div>
      <CodeEditorOutput />
    </div>
  );
}

export default CodeEditor;