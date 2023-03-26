import React from 'react';
import ClassroomMainContent from '../ClassroomMainContent/ClassroomMainContent';
import ClassroomMainNavigation from '../ClassroomMainNavigation/ClassroomMainNavigation';

function ClassroomMain(props) {
  return (
    <div className='classroom-main'>
      <ClassroomMainContent subject={props.subject} questions={props.questions} />
      <ClassroomMainNavigation />
    </div>
  );
}

export default ClassroomMain;