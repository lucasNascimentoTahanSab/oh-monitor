import React from 'react';
import ButtonDropdown from '../../ButtonComponents/ButtonDropdown/ButtonDropdown';

function ClassroomNavigationItem(props) {
  function getNavigationItemButton() {
    return props.navigationItem?.attributes?.navigationItems?.data?.length
      ? (
        <div>
          <a className='navigation-item' href={`#${props.navigationItem?.attributes?.uuidParent ?? '#'}`}>
            <ButtonDropdown width='.875rem' height='.875rem' fill='#84C7E6' />
            <span className='navigation-item__name overflow-ellipsis'>{props.navigationItem?.attributes?.title}</span>
          </a>
        </div>
      )
      : (
        <div>
          <a className='navigation-item' href={`#${props.navigationItem?.attributes?.uuidParent ?? ''}`}>
            <span className='navigation-item__name overflow-ellipsis'>{props.navigationItem?.attributes?.title}</span>
          </a>
        </div>
      );
  }

  function getNavigation() {
    return props.navigationItem?.attributes?.navigationItems?.data?.length
      ? (
        <nav className='classroom-stage__navigation navigation-item__navigation-items'>
          {getNavigationItems()}
        </nav>
      )
      : null;
  }

  function getNavigationItems() {
    return props.navigationItem?.attributes?.navigationItems?.data?.length
      ? props.navigationItem.attributes.navigationItems.data.map(navigationItem =>
        <ClassroomNavigationItem key={navigationItem.attributes?.uuid} navigationItem={navigationItem} />
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

export default ClassroomNavigationItem;