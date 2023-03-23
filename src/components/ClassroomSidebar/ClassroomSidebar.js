import React, { useState } from 'react';
import SidebarItem from '../SidebarItem/SidebarItem';

function ClassroomSidebar(props) {
  const [items, setItems] = useState(props.items);

  function selectItem(key) {
    unselectCurrentItem();
    selectItemByKey(key);
    setItems(items);
  }

  function selectItemByKey(key) {
    const item = getItemByKey(key);

    if (!item) { return; }

    item.selected = true;
  }

  function unselectCurrentItem() {
    const item = getSelectedItem();

    if (!item) { return; }

    item.selected = false;
  }

  function getSelectedItem() {
    return items.find(item => item.selected);
  }

  function getItemByKey(key) {
    return items.find(item => item.screen === key);
  }

  function getSidebarItems() {
    if (!Array.isArray(props?.items)) { return null; }

    return items.map(item => (
      <SidebarItem key={item.screen} screen={item.screen} label={item.label} selected={item.selected} selectItem={selectItem} />
    ));
  }

  return (
    <nav className='section sidebar'>
      {getSidebarItems()}
    </nav>
  );
}

export default ClassroomSidebar;