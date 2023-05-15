/**
 * @file Módulo responsável pela exibição do terminal em editor de códigos.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useState } from 'react';
import CodeEditorPromptMenu from '../CodeEditorPromptMenu/CodeEditorPromptMenu.js';
import CodeEditorPromptContent from '../CodeEditorPromptContent/CodeEditorPromptContent';
import PromptMenuItem from '../../../classes/PromptMenuItem.js';
import Util from '../../../classes/Util';
import Resizer from '../../../classes/Resizer.js';
import config from '../../../config.json';

function CodeEditorPrompt(props) {
  const [menuItems, setMenuItems] = useState([]);
  const [currentMenuItem, setCurrentMenuItem] = useState([]);
  const [contentRef, setContentRef] = useState(null);
  const [resizer, setResizer] = useState(null);

  /**
   * Hook responsável por inicializar itens do menu no terminal.
   */
  useEffect(() => { if (!menuItems.length) { getMenuItems() } }, [menuItems]);

  function getMenuItems() {
    const newMenuItems = config.prompt.menu.map(item => new PromptMenuItem(item));

    setMenuItems(newMenuItems);
    setCurrentMenuItem(Util.getCurrentItem(newMenuItems));
  }

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
    <div className='prompt'>
      <div className='prompt__resizer' onMouseDown={event => resizer.resize(event)}></div>
      <div className='prompt__content'>
        <CodeEditorPromptMenu items={menuItems} setCurrentItem={Util.setCurrentItem(menuItems, updateMenuItems)} />
        <CodeEditorPromptContent current={currentMenuItem} setContentRef={setContentRef} />
      </div>
    </div>
  );
}

export default CodeEditorPrompt;