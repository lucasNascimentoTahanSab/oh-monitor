import React from 'react';
import ClassroomMainContent from '../ClassroomMainContent/ClassroomMainContent';
import ClassroomMainNavigation from '../ClassroomMainNavigation/ClassroomMainNavigation';

function ClassroomMain(props) {
  return (
    <div className='classroom-main'>
      <ClassroomMainContent />
      <ClassroomMainNavigation />
    </div>
  );
}

export default ClassroomMain;