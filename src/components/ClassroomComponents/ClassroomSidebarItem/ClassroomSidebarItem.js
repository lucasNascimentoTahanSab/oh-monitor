/**
 * @file Módulo responsável pela exibição da barra lateral esquerda de navegação para 
 * diferentes estágios da sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import TabsContext from '../../Context/TabsContext/TabsContext';
import util from '../../../classes/util';

function ClassroomSidebarItem(props) {
  const [tabs, setTabs] = useContext(TabsContext);
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
  function setCurrentTab() {
    if (typeof props.onChange !== 'function') { return; }

    props.onChange(props.index);

    util.setCurrentItem(tabs, setTabs)(tab.uuid);
  }

  function getItemClass() {
    return `sidebar-item__name no-select overflow-ellipsis ${tab?.current ? 'sidebar-item--selected' : ''}`;
  }

  return (
    <div className='menu__item'>
      <input id={tab?.uuid} className='menu__item-radio' type='radio' name={props.group} checked={getChecked()} onChange={setCurrentTab} />
      <label className={getItemClass()} htmlFor={tab?.uuid}>{tab?.title}</label>
    </div>
  );
}

export default ClassroomSidebarItem;