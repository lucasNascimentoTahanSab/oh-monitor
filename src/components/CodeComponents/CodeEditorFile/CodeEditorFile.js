import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

function CodeEditorFile(props) {
  const [monaco, setMonaco] = useState(null);
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    setMonaco(monaco);
  }

  return (
    <div className='code-editor__file'>
      <Editor
        height={'34.6875rem'}
        defaultLanguage='c'
        value={props.file?.code}
        theme='vs-dark'
        onMount={handleEditorDidMount}
        options={{
        }}
      />
    </div>
  );
}

export default CodeEditorFile;