/**
 * @file Módulo responsável pela exibição da barra lateral esquerda de navegação para 
 * diferentes estágios da sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useState } from 'react';
import Util from '../../../classes/Util';

function ClassroomSidebarItem(props) {
  const [tab, setTab] = useState(null);

  useEffect(() => setTab(props.tab), [props.tab]);

  /**
   * Hook responsável pela atualização da barra de progresso de acordo com estágio
   * selecionado.
   */
  useEffect(() => { if (tab?.current) { props.onChange(props.index); } }, [tab, props]);

  function getChecked() {
    return tab?.current ?? false;
  }

  /**
   * Método responsável por atualizar a guia atual e conteúdos relacionados.
   * 
   * @returns 
   */
  function setCurrentitem() {
    Util.handle(props.onChange, props.index);
    Util.handle(props.setCurrentItem, tab.uuid);
  }

  function getItemClass() {
    return `sidebar-item__name no-select overflow-ellipsis ${tab?.current ? 'sidebar-item--selected' : ''}`;
  }

  return (
    <div className='menu__item'>
      <input id={tab?.uuid} className='menu__item-radio' type='radio' name={props.group} checked={getChecked()} onChange={setCurrentitem} />
      <label className={getItemClass()} htmlFor={tab?.uuid}>{tab?.title}</label>
    </div>
  );
}

export default ClassroomSidebarItem;