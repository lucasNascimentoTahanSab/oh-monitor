import React, { useContext } from 'react';
import ClassroomStageContent from '../ClassroomStageContent/ClassroomStageContent';
import ClassroomStageNavigation from '../ClassroomStageNavigation/ClassroomStageNavigation';
import { TabContext } from '../../Context/TabContext/TabContext';

function ClassroomStage(props) {
  const [tab,] = useContext(TabContext);

  function getStageClass() {
    return tab?.attributes?.navigation?.data?.attributes?.navigationItems?.data?.length
      ? 'classroom-stage'
      : 'classroom-stage--without-navigation';
  }

  function getNavigation() {
    return tab?.attributes?.navigation?.data?.attributes?.navigationItems?.data?.length ? <ClassroomStageNavigation /> : null;
  }

  return (
    <div className={getStageClass()}>
      <ClassroomStageContent />
      {getNavigation()}
    </div>
  );
}

export default ClassroomStage;