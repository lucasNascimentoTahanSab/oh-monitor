/**
 * @file Módulo responsável pela exibição do editor de código.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import CodeEditorRefContext from '../../Context/CodeEditorRefContext/CodeEditorRefContext.js';
import Util from '../../../classes/util/Util.js';
import config from '../../../config.json';

function CodeEditorFile(props) {
  const codeEditorRef = useContext(CodeEditorRefContext);
  const [code, setCode] = useState(null);
  const [editor, setEditor] = useState(null);
  const codeEditorFileRef = useRef(null);

  useEffect(() => setCode(props.code), [props.code]);

  const setCodeEditorFileRefCallback = useCallback(ref => props.setCodeEditorFileRef(ref), [props]);

  /**
   * Hook responsável por entregar referência ao código para o workspace.
   */
  useEffect(() => { setCodeEditorFileRefCallback(codeEditorFileRef) }, [setCodeEditorFileRefCallback]);

  /**
   * Método responsável por reajustar dimensões do editor ao pôr ou remover tela cheia.
   */
  const resizeEditorFullscreenCallback = useCallback(resizeEditorFullscreen, [resizeEditorFullscreen]);

  function resizeEditorFullscreen() {
    editor?.layout({});
  }

  /**
   * Método responsável por reajustar dimensões do editor ao reajustar tamanho da tela.
   */
  const resizeEditorCallback = useCallback(resizeEditor, [resizeEditor]);

  function resizeEditor() {
    if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement) { return; }

    editor?.layout({});
  }

  useEffect(() => {
    window.addEventListener('resize', resizeEditorCallback);
    codeEditorRef?.current?.addEventListener('fullscreenchange', resizeEditorFullscreenCallback);
    codeEditorRef?.current?.addEventListener('mozfullscreenchange', resizeEditorFullscreenCallback);
    codeEditorRef?.current?.addEventListener('MSFullscreenChange', resizeEditorFullscreenCallback);
    codeEditorRef?.current?.addEventListener('webkitfullscreenchange', resizeEditorFullscreenCallback);
  }, [codeEditorRef, resizeEditorCallback, resizeEditorFullscreenCallback]);

  function handleComponentDidMount(editor) {
    setEditor(editor);
  }

  return (
    <div className='tcc-code-editor-file' ref={codeEditorFileRef}>
      <Editor
        defaultLanguage={config.language}
        value={code?.content}
        theme='vs-dark'
        // Para atualização do arquivo atual é considerado o UID do arquivo recebido ao invés
        // do arquivo já configurado, evitando incongruências entre atualizações por conta de
        // limitações do editor.
        onChange={content => Util.handle(props.onChange, props.code.uid, content)}
        onMount={handleComponentDidMount}
        options={{
          readOnly: code?.disabled,
          minimap: { enabled: props.minimap },
          bracketPairColorization: { enabled: true },
          dropIntoEditor: { enabled: true },
          mouseWheelZoom: true,
          quickSuggestions: {
            comments: 'on',
            other: 'on',
            strings: 'on'
          },
          tabSize: 2,
          selectOnLineNumbers: true,
          selectionHighlight: true,
          snippetSuggestions: 'top'
        }}
      />
    </div>
  );
}

export default CodeEditorFile;