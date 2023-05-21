/**
 * @file Módulo responsável pela exibição do terminal em editor de códigos.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import CodeEditorPromptMenu from '../CodeEditorPromptMenu/CodeEditorPromptMenu.js';
import CodeEditorPromptContent from '../CodeEditorPromptContent/CodeEditorPromptContent.js';
import PromptMenuItem from '../../../classes/prompt/PromptMenuItem.js';
import FileContext from '../../Context/FileContext/FileContext.js';
import Util from '../../../classes/util/Util.js';
import Resizer from '../../../classes/util/Resizer.js';
import config from '../../../config.json';

function CodeEditorPrompt() {
  const [file,] = useContext(FileContext);
  const [menuItems, setMenuItems] = useState([]);
  const [currentMenuItem, setCurrentMenuItem] = useState(null);
  const [contentRef, setContentRef] = useState(null);
  const [resizer, setResizer] = useState(null);

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

  useEffect(() => { if (contentRef) { setResizer(new Resizer(contentRef.current)) } }, [contentRef]);

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
    <div className='tcc-code-editor-prompt'>
      <div className='tcc-code-editor-prompt__resizer' onMouseDown={event => resizer.resize(event)}></div>
      <div className='tcc-code-editor-prompt__content'>
        <CodeEditorPromptMenu items={menuItems} setCurrentItem={Util.setCurrentItem(menuItems, updateMenuItems)} />
        <CodeEditorPromptContent current={currentMenuItem} setContentRef={setContentRef} />
      </div>
    </div>
  );
}

export default CodeEditorPrompt;