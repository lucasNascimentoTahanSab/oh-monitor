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
        key={item.uuid}
        item={item}
        group={`code-editor-prompt-menu-radio-group`}
        onChange={props.setCurrentItem}
        selectorClassName='prompt__menu-item-radio'
        labelClassName='prompt__menu-item no-select'
      />
    );
  }

  return (
    <div className='code-editor__prompt-menu'>
      {getMenuItems()}
    </div>
  );
}

export default CodeEditorPromptMenu;