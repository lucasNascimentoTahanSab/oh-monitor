/**
 * @file Módulo responsável pela exibição do ambiente de trabalho do editor de código, apresentando,
 * além do editor, menu e tela para animações. 
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext } from 'react';
import AnimationScreen from '../../AnimationComponents/AnimationScreen/AnimationScreen.js';
import CodeEditorFile from '../CodeEditorFile/CodeEditorFile.js';
import CodeEditorMenu from '../CodeEditorMenu/CodeEditorMenu.js';
import FileContext from '../../Context/FileContext/FileContext.js';
import CodesContext from '../../Context/CodesContext/CodesContext.js';
import CodeContext from '../../Context/CodeContext/CodeContext.js';
import Util from '../../../classes/util/Util.js';

function CodeEditorWorkspace() {
  const [file,] = useContext(FileContext);
  const [codes, setCodes] = useContext(CodesContext);
  const [currentCode,] = useContext(CodeContext);

  return (
    <div className='code-editor__workspace'>
      <CodeEditorMenu />
      <div className='code-editor__workspace-inner'>
        <CodeEditorFile code={currentCode} onChange={Util.updateCodeIn(codes, setCodes)} />
        <AnimationScreen commands={file?.commands} />
      </div>
    </div>
  );
}

export default CodeEditorWorkspace;