import React, { useCallback, useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

function CodeEditorFile(props) {
  const [file, setFile] = useState(null);
  const editorRef = useRef(null);

  const setFileCallback = useCallback(file => setFile(file), [setFile]);

  useEffect(() => { setFileCallback(props.file) }, [setFileCallback, props.file, file]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function handleEditorChange(code) {
    if (typeof props.setFile !== 'function') { return; }

    props.setFile({ ...props.file, code });
  }

  return (
    <div className='code-editor__file'>
      <Editor
        height={'34.6875rem'}
        defaultLanguage='c'
        value={file?.code}
        theme='vs-dark'
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          readOnly: file?.disabled
        }}
      />
    </div>
  );
}

export default CodeEditorFile;