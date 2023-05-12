import React, { useCallback, useEffect, useState } from 'react';
import { TabContext } from '../../Context/TabContext/TabContext';
import { ExerciseContext } from '../../Context/ExerciseContext/ExerciseContext';
import ClassroomSidebar from '../ClassroomSidebar/ClassroomSidebar';
import { callouts } from '../../../classes/callout';
import ClassroomStage from '../ClassroomStage/ClassroomStage';
import util from '../../../classes/util';

function Classroom(props) {
  const [subject, setSubject] = useState(null);
  const [tab, setTab] = useState(null);
  const [exercises, setExercises] = useState(null);

  useEffect(() => { if (!subject) { getSubject(); } });

  async function getSubject() {
    setSubject((await callouts.content.getSubject(props.uuid))?.data?.[0]);
  }

  const callbackGetTab = useCallback(() => util.getMainTab(subject), [subject]);

  useEffect(() => { if (!tab && subject) { setTab(callbackGetTab()); } }, [tab, subject, callbackGetTab]);

  const callbackGetExercises = useCallback(() => util.getExercises(tab), [tab]);

  useEffect(() => { if (!exercises && tab) { setExercises(callbackGetExercises()); } }, [exercises, tab, callbackGetExercises]);

  return (
    <TabContext.Provider value={[tab, setTab]}>
      <ExerciseContext.Provider value={[exercises, setExercises]}>
        <div className='classroom'>
          <ClassroomSidebar tabs={subject?.attributes?.tabs} />
          <ClassroomStage />
        </div>
      </ExerciseContext.Provider>
    </TabContext.Provider>
  );
}

export default Classroom;