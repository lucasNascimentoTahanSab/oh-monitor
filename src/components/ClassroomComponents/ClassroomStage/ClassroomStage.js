import React from 'react';
import ClassroomStageContent from '../ClassroomStageContent/ClassroomStageContent';
import ClassroomStageNavigation from '../ClassroomStageNavigation/ClassroomStageNavigation';

function ClassroomStage(props) {
  return (
    <div className='classroom-stage'>
      <ClassroomStageContent />
      <ClassroomStageNavigation />
    </div>
  );
}

export default ClassroomStage;