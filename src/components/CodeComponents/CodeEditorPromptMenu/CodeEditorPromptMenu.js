/**
 * @file Módulo responsável pela exibição do menu do terminal do editor de código.
 * @copyright Lucas N. T. Sab 2023 
 */
import React, { useCallback, useEffect, useRef } from 'react';
import CodeEditorMenuItem from '../CodeEditorMenuItem/CodeEditorMenuItem.js';

function CodeEditorPromptMenu(props) {
  const menuRef = useRef();

  const setMenuRefCallback = useCallback(ref => props.setMenuRef(ref), [props]);

  /**
   * Hook responsável por entregar referência ao menu para o terminal.
   */
  useEffect(() => { setMenuRefCallback(menuRef) }, [setMenuRefCallback]);

  /**
   * Método responsável pela obtenção dos itens do menu para exibição no terminal.
   * 
   * @returns {array}
   */
  function getMenuItems() {
    if (!props.items?.length) { return null; }

    return props.items.map(item =>
      <CodeEditorMenuItem
        key={`${item.uid}-prompt-menu`}
        item={item}
        group={`${item.uid}-prompt-menu`}
        onChange={props.setCurrentItem}
        selectorClassName='tcc-code-editor-menu-item__radio'
        labelClassName='tcc-code-editor-menu-item tcc-no-select'
      />
    );
  }

  return (
    <div className='tcc-code-editor-prompt-menu' ref={menuRef}>
      {getMenuItems()}
    </div>
  );
}

export default CodeEditorPromptMenu;