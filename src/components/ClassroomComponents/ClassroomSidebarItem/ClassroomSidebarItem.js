/**
 * @file Módulo responsável pela exibição da barra lateral esquerda de navegação para 
 * diferentes estágios da sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import Util from '../../../classes/util/Util.js';
import TabsContext from '../../Context/TabsContext/TabsContext.js';
import LoadingComponent from '../../LoadingComponents/LoadingComponent/LoadingComponent.js';

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

  /**
   * Método responsável pela exibição de loading enquanto guia estiver carregando.
   * 
   * @returns {ReactElement}
   */
  function getLoading() {
    return (<LoadingComponent />);
  }

  return (
    <li className='tcc-sidebar-item'>
      <div className='tcc-menu-item'>
        <input
          id={tab?.uid}
          className='tcc-menu-item__radio'
          type='radio'
          name={props.group}
          checked={getChecked()}
          disabled={Util.isTabDisabled(tabs, tab)}
          onChange={setCurrentitem} />
        <label className='tcc-sidebar-item__label no-select overflow-ellipsis' htmlFor={tab?.uid}>{tab?.title}</label>
      </div>
      {tab?.loading ? getLoading() : null}
    </li>
  );
}

export default ClassroomSidebarItem;