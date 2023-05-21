/**
 * @file Módulo responsável pela exibição do menu do terminal do editor de código.
 * @copyright Lucas N. T. Sab 2023 
 */
import React from 'react';
import CodeEditorMenuItem from '../CodeEditorMenuItem/CodeEditorMenuItem.js';

function CodeEditorPromptMenu(props) {
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
        labelClassName='tcc-code-editor-menu-item no-select'
      />
    );
  }

  return (
    <div className='tcc-code-editor-prompt-menu'>
      {getMenuItems()}
    </div>
  );
}

export default CodeEditorPromptMenu;