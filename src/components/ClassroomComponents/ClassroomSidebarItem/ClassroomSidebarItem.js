import React, { useContext } from 'react';
import TabContext from '../../Context/TabContext/TabContext';
import ExerciseContext from '../../Context/ExerciseContext/ExerciseContext';
import { ReactComponent as Asterisk } from '../../../svg/asterisk.svg';
import util from '../../../classes/util';

function ClassroomSidebarItem(props) {
  const [tab, setTab] = useContext(TabContext);
  const [, setExercises] = useContext(ExerciseContext);

  function onItemClick() {
    setTab(props.tab);
    setExercises(util.getExercises(props.tab));
  }

  function selected() {
    return isCurrentTabSelected(props.tab)
      ? (<Asterisk
        style={{ height: '.875rem', width: '.875rem', minWidth: '.875rem' }}
        alt='Three crossing bars, two crossing diagonally each other and, the other one, vertically.'
      />)
      : null;
  }

  function isCurrentTabSelected(currentTab) {
    return currentTab?.attributes?.uuid === tab?.attributes?.uuid;
  }

  function getItemClass() {
    return `sidebar-item__name no-select overflow-ellipsis ${isCurrentTabSelected(props.tab) ? 'sidebar-item--selected' : ''}`;
  }

  return (
    <button id={props.tab?.attributes?.uuid} className='sidebar-item' onClick={onItemClick}>
      {selected()}
      <span className={getItemClass()} title={props.tab?.attributes?.title}>{props.tab?.attributes?.title}</span>
    </button>
  );
}

export default ClassroomSidebarItem;