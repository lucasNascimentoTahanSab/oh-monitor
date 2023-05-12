/**
 * @file Módulo responsável pela exibição do editor de código.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import config from '../../../config.json';
import util from '../../../classes/util';

function CodeEditorFile(props) {
  const [file, setFile] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => { setFile(props.file) }, [props.file]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <div className='code-editor__file'>
      <Editor
        height={'34.6875rem'}
        defaultLanguage={config.language}
        value={file?.code}
        theme='vs-dark'
        onMount={handleEditorDidMount}
        onChange={code => util.handle(props.setFile, { ...props.file, code })}
        options={{ readOnly: file?.disabled }}
      />
    </div>
  );
}

export default CodeEditorFile;