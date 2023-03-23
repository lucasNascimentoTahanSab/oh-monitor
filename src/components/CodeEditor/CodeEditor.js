import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import AnimationScreen from '../AnimationScreen/AnimationScreen';
import CodeEditorOutput from '../CodeEditorOutput/CodeEditorOutput';

function CodeEditor(props) {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <div className='code-editor'>
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