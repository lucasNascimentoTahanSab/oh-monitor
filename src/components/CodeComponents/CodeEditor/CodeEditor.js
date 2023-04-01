import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import AnimationScreen from '../../AnimationComponents/AnimationScreen/AnimationScreen';
import CodeEditorOutput from '../CodeEditorOutput/CodeEditorOutput';
import ButtonConfirmation from '../../ButtonComponents/ButtonConfirmation/ButtonConfirmation';
import { callouts } from '../../../classes/callout';

function CodeEditor(props) {
  const editorRef = useRef(null);

  async function sendCode() {
    const response = await callouts.code.post({ code: editorRef.current.getValue(), language: 'java' });

    console.log(response);
  }

  function handleEditorDidMount(editor,) {
    editorRef.current = editor;
  }

  return (
    <div className='code-editor'>
      <div className='code-editor__inner'>
        <Editor
          height={'34.6875rem'}
          defaultLanguage='c'
          value={props.value}
          theme='vs-dark'
          onMount={handleEditorDidMount}
          options={{
          }}
        />
        <AnimationScreen />
      </div>
      <CodeEditorOutput />
      <ButtonConfirmation value='Enviar' onClick={sendCode} />
    </div>
  );
}

export default CodeEditor;