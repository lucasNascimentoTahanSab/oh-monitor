import React from 'react';
import ClassroomSidebarItem from '../ClassroomSidebarItem/ClassroomSidebarItem';

function ClassroomSidebar(props) {
  function getSidebarItems() {
    if (!props.tabs?.data?.length) { return null; }

    return props.tabs.data.map(tab => <ClassroomSidebarItem key={tab.attributes?.uuid} tab={tab} />);
  }

  return (
    <nav className='section sidebar'>
      {getSidebarItems()}
    </nav>
  );
}

export default ClassroomSidebar;