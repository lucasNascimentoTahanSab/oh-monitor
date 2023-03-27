import React, { useContext } from 'react';
import { TabContext } from '../../Context/TabContext/TabContext';
import ClassroomStageContent from '../ClassroomStageContent/ClassroomStageContent';
import ClassroomStageNavigation from '../ClassroomStageNavigation/ClassroomStageNavigation';

function ClassroomStage(props) {
  const [tab,] = useContext(TabContext);

  return (
    <div className='classroom-stage'>
      <ClassroomStageContent tab={tab} />
      <ClassroomStageNavigation navigation={tab?.attributes?.navigation} />
    </div>
  );
}

export default ClassroomStage;