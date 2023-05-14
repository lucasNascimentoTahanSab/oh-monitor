/**
 * @file Módulo responsável pela exibição do editor de código.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useRef } from 'react';
import Editor from '@monaco-editor/react';
import FileContext from '../../Context/FileContext/FileContext';
import config from '../../../config.json';

function CodeEditorFile(props) {
  const [currentFile, setCurrentFile] = useContext(FileContext);
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <div className='code-editor__file'>
      <Editor
        height={'34.6875rem'}
        defaultLanguage={config.language}
        value={currentFile?.content}
        theme='vs-dark'
        onMount={handleEditorDidMount}
        onChange={content => setCurrentFile({ ...currentFile, content })}
        options={{ readOnly: currentFile?.disabled }}
      />
    </div>
  );
}

export default CodeEditorFile;