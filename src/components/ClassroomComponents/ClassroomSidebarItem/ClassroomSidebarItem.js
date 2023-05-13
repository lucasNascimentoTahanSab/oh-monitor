import React, { useContext, useEffect } from 'react';
import TabContext from '../../Context/TabContext/TabContext';
import ExerciseContext from '../../Context/ExerciseContext/ExerciseContext';
import util from '../../../classes/util';

function ClassroomSidebarItem(props) {
  const [tab, setTab] = useContext(TabContext);
  const [, setExercises] = useContext(ExerciseContext);

  useEffect(() => { if (isCurrentTabSelected()) { props.onChange(props.index); } });

  function setCurrentTab() {
    if (typeof props.onChange !== 'function') { return; }

    setTab(props.tab);
    setExercises(util.getExercises(props.tab));

    props.onChange(props.index);
  }

  function isCurrentTabSelected() {
    return props.tab?.attributes?.uuid === tab?.attributes?.uuid;
  }

  function getItemClass() {
    return `sidebar-item__name no-select overflow-ellipsis ${isCurrentTabSelected() ? 'sidebar-item--selected' : ''}`;
  }

  return (
    <div className='menu__item'>
      <input id={props.tab?.attributes?.uuid} className='menu__item-radio' type='radio' name={props.group} checked={isCurrentTabSelected()} onChange={setCurrentTab} />
      <label className={getItemClass()} htmlFor={props.tab?.attributes?.uuid}>{props.tab?.attributes?.title}</label>
    </div>
  );
}

export default ClassroomSidebarItem;