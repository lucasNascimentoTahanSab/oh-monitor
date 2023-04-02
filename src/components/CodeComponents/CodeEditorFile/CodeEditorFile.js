import React, { useCallback, useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

function CodeEditorFile(props) {
  const [file, setFile] = useState(null);
  const editorRef = useRef(null);

  const callbackGetFile = useCallback(() => setFile(props.file), [props.file]);

  useEffect(() => {
    if (!file && props.file) {
      callbackGetFile();
    }
  }, [file, props.file, callbackGetFile]);

  function handleEditorDidMount(editor,) {
    editorRef.current = editor;
  }

  return (
    <div className='code-editor__file'>
      <Editor
        height={'34.6875rem'}
        defaultLanguage='c'
        value={file?.code}
        theme='vs-dark'
        onMount={handleEditorDidMount}
        options={{
        }}
      />
    </div>
  );
}

export default CodeEditorFile;