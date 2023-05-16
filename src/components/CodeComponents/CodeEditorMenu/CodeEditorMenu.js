/**
 * @file Módulo responsável pela exibição do menu do editor de código.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext } from 'react';
import CodeEditorMenuItem from '../CodeEditorMenuItem/CodeEditorMenuItem';
import CodeEditorMenuSettings from '../CodeEditorMenuSettings/CodeEditorMenuSettings.js';
import FilesContext from '../../Context/FilesContext/FilesContext.js';
import Util from '../../../classes/util/Util.js';

function CodeEditorMenu(props) {
  const [files, setFiles] = useContext(FilesContext);

  /**
   * Método responsável pela obtenção dos itens do menu a serem exibidos.
   * 
   * @returns {array}
   */
  function getMenuItems() {
    if (!files?.size) { return null; }

    return Array.from(files.values()).map(file =>
      <CodeEditorMenuItem
        key={file.uuid}
        item={file}
        group='code-editor-menu-radio-group'
        selectorClassName='menu__item-radio'
        labelClassName='menu__item-label'
        onChange={Util.setCurrentItemInMap(files, setFiles)}
      />
    );
  }

  return (
    <div className='code-editor__menu'>
      <div className='code-editor__menu-tabs'>{getMenuItems()}</div>
      <CodeEditorMenuSettings />
    </div>
  );
}

export default CodeEditorMenu;