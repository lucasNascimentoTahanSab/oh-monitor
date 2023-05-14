/**
 * @file Módulo responsável pela exibição da seção de navegação pela sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useRef } from 'react';
import ClassroomSidebarItem from '../ClassroomSidebarItem/ClassroomSidebarItem';
import TabsContext from '../../Context/TabsContext/TabsContext';
import Util from '../../../classes/Util';

function ClassroomSidebar(props) {
  const [tabs, setTabs] = useContext(TabsContext);
  const fillRef = useRef(null);

  /**
   * Método responsável pela obtenção dos ClassroomSidebarItems a serem exibidos.
   * 
   * @returns {array}
   */
  function getSidebarItems() {
    if (!tabs?.length) { return null; }

    return tabs.map((tab, index) =>
      <ClassroomSidebarItem
        key={tab.uuid}
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
    fillRef.current.style.height = `${Math.ceil(((index + 1) / tabs.length) * 100)}%`;
  }

  return (
    <nav className='section'>
      <div className='sidebar'>
        <div className='sidebar__progress'>
          <div className='sidebar__progress-fill' ref={fillRef}>
          </div>
        </div>
        <div className='sidebar__items'>
          {getSidebarItems()}
        </div>
      </div>
    </nav>
  );
}

export default ClassroomSidebar;