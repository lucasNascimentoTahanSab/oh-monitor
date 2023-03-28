import React from 'react';
import ButtonDropdown from '../../ButtonComponents/ButtonDropdown/ButtonDropdown';

function ClassroomStageNavigationItem(props) {
  function getNavigationItemButton() {
    return Array.isArray(props.navigationItem?.attributes?.navigationItems?.data) && props.navigationItem.attributes.navigationItems.data.length
      ? (
        <div className='overflow-ellipsis'>
          <a className='navigation-item' href={`#${props.navigationItem?.attributes?.uuidParent ?? '#'}`}>
            <ButtonDropdown width='.875rem' height='.875rem' fill='#808B96' />
            <span className='navigation-item__name'>{props.navigationItem?.attributes?.title}</span>
          </a>
        </div>
      )
      : (
        <div className='overflow-ellipsis'>
          <a className='navigation-item' href={`#${props.navigationItem?.attributes?.uuidParent ?? ''}`}>
            <span className='navigation-item__name'>{props.navigationItem?.attributes?.title}</span>
          </a>
        </div>
      );
  }

  function getNavigation() {
    return Array.isArray(props.navigationItem?.attributes?.navigationItems?.data) && props.navigationItem.attributes.navigationItems.data.length
      ? (
        <nav className='classroom-stage__navigation navigation-item__navigation-items'>
          {getNavigationItems()}
        </nav>
      )
      : null;
  }

  function getNavigationItems() {
    return Array.isArray(props.navigationItem?.attributes?.navigationItems?.data) && props.navigationItem.attributes.navigationItems.data.length
      ? props.navigationItem.attributes.navigationItems.data.map(navigationItem =>
        <ClassroomStageNavigationItem key={navigationItem.attributes?.uuid} navigationItem={navigationItem} />
      )
      : null;
  }

  return (
    <div>
      {getNavigationItemButton()}
      {getNavigation()}
    </div>
  );
}

export default ClassroomStageNavigationItem;