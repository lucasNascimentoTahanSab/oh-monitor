/**
 * @file Módulo responsável pela exibição do ambiente de trabalho do editor de código, apresentando,
 * além do editor, menu e tela para animações. 
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext } from 'react';
import AnimationScreen from '../../AnimationComponents/AnimationScreen/AnimationScreen';
import CodeEditorFile from '../CodeEditorFile/CodeEditorFile';
import CodeEditorMenu from '../CodeEditorMenu/CodeEditorMenu';
import FilesContext from '../../Context/FilesContext/FilesContext';
import FileContext from '../../Context/FileContext/FileContext';
import Util from '../../../classes/util/Util';

function CodeEditorWorkspace(props) {
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