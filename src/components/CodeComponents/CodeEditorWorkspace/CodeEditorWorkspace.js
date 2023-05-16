/**
 * @file Módulo responsável pela exibição do ambiente de trabalho do editor de código, apresentando,
 * além do editor, menu e tela para animações. 
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext } from 'react';
import AnimationScreen from '../../AnimationComponents/AnimationScreen/AnimationScreen.js';
import CodeEditorFile from '../CodeEditorFile/CodeEditorFile.js';
import CodeEditorMenu from '../CodeEditorMenu/CodeEditorMenu.js';
import FilesContext from '../../Context/FilesContext/FilesContext.js';
import FileContext from '../../Context/FileContext/FileContext.js';
import Util from '../../../classes/util/Util.js';

function CodeEditorWorkspace() {
  const [files, setFiles] = useContext(FilesContext);
  const [currentFile,] = useContext(FileContext);

  return (
    <div className='code-editor__workspace'>
      <CodeEditorMenu />
      <div className='code-editor__workspace-inner'>
        <CodeEditorFile file={currentFile} onChange={Util.updateFileIn(files, setFiles)} />
        <AnimationScreen />
      </div>
    </div>
  );
}

export default CodeEditorWorkspace;