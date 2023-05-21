/**
 * @file Módulo responsável pela exibição da seção de navegação pela sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useState } from 'react';
import ClassroomSidebarItem from '../ClassroomSidebarItem/ClassroomSidebarItem.js';
import TabsContext from '../../Context/TabsContext/TabsContext.js';
import Util from '../../../classes/util/Util.js';
import LoadingProgress from '../../LoadingComponents/LoadingProgress/LoadingProgress.js';

function ClassroomSidebar() {
  const [tabs, setTabs] = useContext(TabsContext);
  const [progress, setProgress] = useState(null);

  /**
   * Método responsável pela obtenção dos ClassroomSidebarItems a serem exibidos.
   * 
   * @returns {array}
   */
  function getSidebarItems() {
    if (!tabs?.length) { return null; }

    return tabs.map((tab, index) =>
      <ClassroomSidebarItem
        key={tab.uid}
        tab={tab}
        index={index}
        group='classroom-sidebar-radio-group'
        onChange={updateProgress}
        setCurrentItem={Util.setCurrentItem(tabs, setTabs)}
      />
    );
  }

  /**
   * Método responsável pela atualização da barra de progresso de acordo com estágio
   * escolhido para exibição.
   * 
   * @param {number} index 
   */
  function updateProgress(index) {
    setProgress(index + 1);
  }

  return (
    <nav className='tcc-classroom__section tcc-sidebar__section'>
      <div className='tcc-sidebar'>
        <LoadingProgress progress={progress} max={tabs?.length} />
        <ul className='tcc-sidebar__items'>
          {getSidebarItems()}
        </ul>
      </div>
    </nav>
  );
}

export default ClassroomSidebar;