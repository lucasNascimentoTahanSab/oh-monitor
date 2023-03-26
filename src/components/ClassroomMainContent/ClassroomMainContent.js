import React from 'react';
import Exercise from '../Exercise/Exercise';
import Subject from '../Subject/Subject';

function ClassroomMainContent(props) {
  return (
    <div className='section classroom-screen__content'>
      <Subject subject={props.subject} />
      <Exercise exercises={props.subject?.exercises} questions={props.questions} />
    </div>
  );
}

export default ClassroomMainContent;