import React, { useContext } from 'react';
import { ContentContext } from '../ContentContext/ContentContext';
import { ReactComponent as Asterisk } from '../../svg/asterisk.svg';
import { contents } from '../../classes/content';

function SidebarItem(props) {
  const [, setContent] = useContext(ContentContext);

  function onItemClick() {
    if (typeof props?.selectItem !== 'function') { return; }

    setContent(contents[props.screen]);

    props.selectItem(props.screen);
  }

  function selected() {
    return props?.selected ? (
      <Asterisk
        style={{ height: '.875rem', width: '.875rem', minWidth: '.875rem' }}
        alt='Three crossing bars, two crossing diagonally each other and, the other one, vertically.'
      />
    ) : null;
  }

  function getItemClass() {
    return `sidebar-item__name no-select overflow-ellipsis ${props?.selected ? 'sidebar-item--selected' : ''}`;
  }

  return (
    <button className='sidebar-item' onClick={onItemClick}>
      {selected()}
      <span className={getItemClass()} title={props?.label}>{props?.label}</span>
    </button>
  );
}

export default SidebarItem;