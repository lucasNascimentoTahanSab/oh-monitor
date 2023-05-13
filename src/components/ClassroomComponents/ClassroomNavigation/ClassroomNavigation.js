import React, { useContext } from 'react';
import ClassroomNavigationItem from '../ClassroomNavigationItem/ClassroomNavigationItem';
import TabContext from '../../Context/TabContext/TabContext';

function ClassroomNavigation(props) {
  const [tab,] = useContext(TabContext);

  function getNavigationItems() {
    if (!tab?.attributes?.navigation?.data?.attributes?.navigationItems?.data?.length) { return null; }

    return tab.attributes.navigation.data.attributes.navigationItems.data.map(navigationItem =>
      <ClassroomNavigationItem key={navigationItem.attributes?.uuid} navigationItem={navigationItem} />
    );
  }

  return (
    <nav className='section classroom-stage__navigation'>
      {getNavigationItems()}
    </nav>
  );
}

export default ClassroomNavigation;