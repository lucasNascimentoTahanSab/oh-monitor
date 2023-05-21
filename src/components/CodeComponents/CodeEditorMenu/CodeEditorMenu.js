/**
 * @file Módulo responsável pela exibição do menu do editor de código.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext } from 'react';
import CodeEditorMenuItem from '../CodeEditorMenuItem/CodeEditorMenuItem';
import CodeEditorMenuSettings from '../CodeEditorMenuSettings/CodeEditorMenuSettings.js';
import CodesContext from '../../Context/CodesContext/CodesContext.js';
import Util from '../../../classes/util/Util.js';

function CodeEditorMenu(props) {
  const [codes, setCodes] = useContext(CodesContext);

  /**
   * Método responsável pela obtenção dos itens do menu a serem exibidos.
   * 
   * @returns {array}
   */
  function getMenuItems() {
    if (!codes?.length) { return null; }

    return codes.map(code =>
      <CodeEditorMenuItem
        key={`${code.uid}-code-menu`}
        item={code}
        group={`${code.uid}-code-menu`}
        selectorClassName='tcc-menu-item__radio'
        labelClassName='tcc-menu-item__label'
        onChange={Util.setCurrentItem(codes, setCodes)}
      />
    );
  }

  return (
    <div className='tcc-code-editor-menu'>
      <div className='tcc-code-editor-menu__tabs'>{getMenuItems()}</div>
      <CodeEditorMenuSettings showButtonPlay />
    </div>
  );
}

export default CodeEditorMenu;