/**
 * @file Módulo responsável pela exibição do editor de código.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import Util from '../../../classes/util/Util.js';
import config from '../../../config.json';

function CodeEditorFile(props) {
  const [code, setCode] = useState(null);

  useEffect(() => setCode(props.code), [props.code]);

  return (
    <Editor
      className='code-editor__file'
      defaultLanguage={config.language}
      value={code?.content}
      theme='vs-dark'
      // Para atualização do arquivo atual é considerado o UID do arquivo recebido ao invés
      // do arquivo já configurado, evitando incongruências entre atualizações por conta de
      // limitações do editor.
      onChange={content => Util.handle(props.onChange, props.code.uid, content)}
      options={{
        readOnly: code?.disabled,
        bracketPairColorization: { enabled: true },
        dropIntoEditor: { enabled: true },
        mouseWheelZoom: true,
        quickSuggestions: {
          comments: 'on',
          other: 'on',
          strings: 'on'
        },
        selectOnLineNumbers: true,
        selectionHighlight: true,
        snippetSuggestions: 'top',
      }}
    />
  );
}

export default CodeEditorFile;