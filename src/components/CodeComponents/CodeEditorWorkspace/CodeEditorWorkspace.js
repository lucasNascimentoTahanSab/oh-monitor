/**
 * @file Módulo responsável pela exibição do ambiente de trabalho do editor de código, apresentando,
 * além do editor, menu e tela para animações. 
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import CodeEditorMenu from '../CodeEditorMenu/CodeEditorMenu.js';
import CodeEditorFile from '../CodeEditorFile/CodeEditorFile.js';
import ResizerComponent from '../../ResizerComponent/ResizerComponent.js';
import AnimationScreen from '../../AnimationComponents/AnimationScreen/AnimationScreen.js';
import CodeEditorRefContext from '../../Context/CodeEditorRefContext/CodeEditorRefContext.js';
import FileContext from '../../Context/FileContext/FileContext.js';
import CodesContext from '../../Context/CodesContext/CodesContext.js';
import CodeContext from '../../Context/CodeContext/CodeContext.js';
import Resizer from '../../../classes/util/Resizer.js';
import Util from '../../../classes/util/Util.js';

function CodeEditorWorkspace() {
  const codeEditorRef = useContext(CodeEditorRefContext);
  const [file,] = useContext(FileContext);
  const [codes, setCodes] = useContext(CodesContext);
  const [currentCode,] = useContext(CodeContext);
  const [resizer, setResizer] = useState(null);
  const [resizerRef, setResizerRef] = useState(null);
  const [codeEditorFileRef, setCodeEditorFileRef] = useState(null);

  const getDiscountCallback = useCallback(getDiscount, [getDiscount]);

  /**
   * Método responsável pelo cálculo da altura total do redimensionador e menu,
   * não considerada ao redimensionar o conteúdo do terminal.
   * 
   * @returns {number}
   */
  function getDiscount() {
    const resizerWidth = resizerRef.current.getBoundingClientRect().width;

    return resizerWidth;
  }

  useEffect(() => {
    if (resizer) { return; }
    if (!resizerRef) { return; }
    if (!codeEditorFileRef) { return; }
    if (!codeEditorRef) { return; }

    const newResizer = new Resizer(codeEditorFileRef.current, codeEditorRef.current, getDiscountCallback(), 'horizontal');

    newResizer.toggleResizer();

    setResizer(newResizer);
  }, [resizer, resizerRef, codeEditorRef, codeEditorFileRef, getDiscountCallback]);

  return (
    <div className='tcc-code-editor-workspace'>
      <CodeEditorMenu />
      <div className='tcc-code-editor-workspace__content'>
        <CodeEditorFile code={currentCode} onChange={Util.updateCodeIn(codes, setCodes)} setCodeEditorFileRef={setCodeEditorFileRef} />
        <ResizerComponent width='.875rem' height='.875rem' color='#5F5F5F' resizer={resizer} setResizerRef={setResizerRef} vertical />
        <AnimationScreen commands={file?.commands} />
      </div>
    </div>
  );
}

export default CodeEditorWorkspace;