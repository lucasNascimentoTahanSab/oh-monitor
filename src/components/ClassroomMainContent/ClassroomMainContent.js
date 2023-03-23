import React from 'react';
import Exercise from '../Exercise/Exercise';
import Subject from '../Subject/Subject';

function ClassroomMainContent(props) {
  return (
    <div className='section classroom-main__content'>
      <Subject content={props.content} />
      <Exercise questions={props.questions} />
    </div>
  );
}

export default ClassroomMainContent;