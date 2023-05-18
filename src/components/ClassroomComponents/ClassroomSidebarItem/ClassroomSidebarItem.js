/**
 * @file Módulo responsável pela exibição da barra lateral esquerda de navegação para 
 * diferentes estágios da sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import Util from '../../../classes/util/Util.js';
import TabsContext from '../../Context/TabsContext/TabsContext.js';

function ClassroomSidebarItem(props) {
  const [tabs,] = useContext(TabsContext);
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
   * Método responsável por atualizar a guia atual e conteúdos relacionados. Quaisquer
   * atualizações são interrompidas enquanto a guia atual estiver em carregamento.
   * 
   * @returns 
   */
  function setCurrentitem() {
    if (Util.getLoadingItem(tabs)) { return; }

    Util.handle(props.onChange, props.index);
    Util.handle(props.setCurrentItem, tab.uid);
  }

  function getItemClass() {
    return `sidebar-item__name no-select overflow-ellipsis ${tab?.current ? 'sidebar-item--selected' : ''}`;
  }

  /**
   * Método responsável pela exibição de loading enquanto guia estiver carregando.
   * 
   * @returns {ReactElement}
   */
  function getLoading() {
    return (
      <div className='button-play--loading'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <div className='menu__item'>
      <input id={tab?.uid} className='menu__item-radio' type='radio' name={props.group} checked={getChecked()} onChange={setCurrentitem} />
      <label className={getItemClass()} htmlFor={tab?.uid}>{tab?.title}</label>
      {tab?.loading ? getLoading() : null}
    </div>
  );
}

export default ClassroomSidebarItem;