/**
 * @file Módulo responsável pela exibição da seção de navegação pela sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useRef } from 'react';
import ClassroomSidebarItem from '../ClassroomSidebarItem/ClassroomSidebarItem';

function ClassroomSidebar(props) {
  const fillRef = useRef(null);

  function getSidebarItems() {
    if (!props.tabs?.data?.length) { return null; }

    return props.tabs.data.map((tab, index) =>
      <ClassroomSidebarItem
        key={tab.attributes?.uuid}
        tab={tab}
        index={index}
        group='classroom-sidebar-radio-group'
        onChange={updateProgress}
      />
    );
  }

  function updateProgress(index) {
    fillRef.current.style.height = `${Math.ceil(((index + 1) / props.tabs.data.length) * 100)}%`;
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