/**
 * @file Módulo responsável pela exibição do editor de código.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import Util from '../../../classes/util/Util';
import config from '../../../config.json';

function CodeEditorFile(props) {
  const [file, setFile] = useState(null);

  useEffect(() => setFile(props.file), [props.file]);

  return (
    <Editor
      className='code-editor__file'
      defaultLanguage={config.language}
      value={file?.content}
      theme='vs-dark'
      // Para atualização do arquivo atual é considerado o UUID do arquivo recebido ao invés
      // do arquivo já configurado, evitando incongruências entre atualizações por conta de
      // limitações do editor.
      onChange={content => Util.handle(props.onChange, props.file?.uuid, content)}
      options={{
        readOnly: file?.disabled,
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