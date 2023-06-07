/**
 * @file Módulo responsável pela exibição do terminal em editor de códigos.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ResizerComponent from '../../ResizerComponents/ResizerComponent/ResizerComponent.js';
import CodeEditorPromptMenu from '../CodeEditorPromptMenu/CodeEditorPromptMenu.js';
import CodeEditorPromptContent from '../CodeEditorPromptContent/CodeEditorPromptContent.js';
import PromptMenuItem from '../../../classes/prompt/PromptMenuItem.js';
import FileContext from '../../Context/FileContext/FileContext.js';
import Resizer from '../../../classes/util/Resizer.js';
import Util from '../../../classes/util/Util.js';
import config from '../../../config.json';

function CodeEditorPrompt() {
  const [file,] = useContext(FileContext);
  const [menuItems, setMenuItems] = useState([]);
  const [currentMenuItem, setCurrentMenuItem] = useState(null);
  const [resizer, setResizer] = useState(null);
  const [contentRef, setContentRef] = useState(null);
  const [menuRef, setMenuRef] = useState(null);
  const [resizerRef, setResizerRef] = useState(null);
  const promptRef = useRef();

  const getMenuItemsCallback = useCallback(getMenuItems, [getMenuItems]);

  function getMenuItems() {
    const newMenuItems = config.prompt.menu.map(item => new PromptMenuItem(item, file));

    setMenuItems(newMenuItems);
    setCurrentMenuItem(Util.getCurrentItem(newMenuItems));
  }

  /**
   * Hook responsável por inicializar itens do menu no terminal.
   */
  useEffect(() => {
    if (!file) { return; }
    if (menuItems.length) { return; }

    getMenuItemsCallback();
  }, [menuItems, file, getMenuItemsCallback]);

  const getDiscountCallback = useCallback(getDiscount, [getDiscount]);

  /**
   * Método responsável pelo cálculo da altura total do redimensionador e menu,
   * não considerada ao redimensionar o conteúdo do terminal.
   * 
   * @returns {number}
   */
  function getDiscount() {
    const resizerHeight = resizerRef.current.getBoundingClientRect().height;
    const menuHeight = menuRef.current.getBoundingClientRect().height;

    return resizerHeight + menuHeight;
  }

  useEffect(() => {
    if (resizer) { return; }
    if (!resizerRef) { return; }
    if (!menuRef) { return; }
    if (!contentRef) { return; }

    setResizer(new Resizer(contentRef.current, promptRef.current?.parentElement, getDiscountCallback()));
  }, [resizer, resizerRef, menuRef, contentRef, getDiscountCallback]);

  /**
   * Método responsável pela atualização dos itens do menu no terminal e item
   * selecionado.
   * 
   * @param {array} menuItems 
   */
  function updateMenuItems(menuItems) {
    setCurrentMenuItem(Util.getCurrentItem(menuItems));
    setMenuItems(menuItems);
  }

  return (
    <div className='tcc-code-editor-prompt' ref={promptRef}>
      <ResizerComponent width='.875rem' height='.875rem' color='#5F5F5F' resizer={resizer} setResizerRef={setResizerRef} />
      <div className='tcc-code-editor-prompt__content'>
        <CodeEditorPromptMenu items={menuItems} setMenuRef={setMenuRef} setCurrentItem={Util.setCurrentItem(menuItems, updateMenuItems)} />
        <CodeEditorPromptContent current={currentMenuItem} setContentRef={setContentRef} />
      </div>
    </div>
  );
}

export default CodeEditorPrompt;