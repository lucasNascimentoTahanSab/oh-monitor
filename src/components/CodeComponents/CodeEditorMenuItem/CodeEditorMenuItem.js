/**
 * @file Módulo responsável pela exibição dos itens do menu do editor de código.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useState } from 'react';
import Util from '../../../classes/util/Util.js';

function CodeEditorMenuItem(props) {
  const [menuItem, setMenuItem] = useState(null);

  useEffect(() => setMenuItem(props.item), [props.item]);

  function getChecked() {
    return menuItem?.current ?? false;
  }

  /**
   * Método responsável por exibir o arquivo atual em tela. 
   */
  function setCurrentMenuItem() {
    Util.handle(props.onChange, menuItem.uid);
  }

  return (
    <div className='tcc-menu-item'>
      <input
        id={menuItem?.uid}
        className={props.selectorClassName}
        type='radio'
        name={props.group}
        checked={getChecked()}
        onChange={setCurrentMenuItem} />
      <label className={props.labelClassName} htmlFor={menuItem?.uid}>{menuItem?.name}</label>
    </div>
  );
}

export default CodeEditorMenuItem;