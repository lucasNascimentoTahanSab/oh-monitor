import React, { useContext } from 'react';
import ClassroomStageNavigationItem from '../ClassroomStageNavigationItem/ClassroomStageNavigationItem';
import { TabContext } from '../../Context/TabContext/TabContext';

function ClassroomStageNavigation(props) {
  const [tab,] = useContext(TabContext);

  function getNavigationItems() {
    if (!Array.isArray(tab?.attributes?.navigation?.data?.attributes?.navigationItems?.data)) { return; }

    return tab.attributes.navigation.data.attributes.navigationItems.data.map(navigationItem =>
      <ClassroomStageNavigationItem key={navigationItem.attributes?.uuid} navigationItem={navigationItem} />
    );
  }

  return (
    <nav className='section classroom-stage__navigation'>
      {getNavigationItems()}
    </nav>
  );
}

export default ClassroomStageNavigation;