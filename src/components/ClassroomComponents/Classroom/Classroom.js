import React, { useCallback, useEffect, useState } from 'react';
import { TabContext } from '../../Context/TabContext/TabContext';
import ClassroomSidebar from '../ClassroomSidebar/ClassroomSidebar';
import { callouts } from '../../../classes/callout';
import ClassroomStage from '../ClassroomStage/ClassroomStage';

function Classroom(props) {
  const [tab, setTab] = useState(null);
  const [subject, setSubject] = useState(null);

  useEffect(() => { if (!subject) { getSubject(); } });

  async function getSubject() {
    setSubject((await callouts.content.getSubject(props.uuid))?.data?.[0]);
  }

  const callbackGetTab = useCallback(getTab, [subject]);

  function getTab() {
    if (!Array.isArray(subject?.attributes?.tabs?.data)) { return null; }

    return subject.attributes.tabs.data.find(tab => tab.attributes?.main);
  }

  useEffect(() => { if (!tab && subject) { setTab(callbackGetTab()); } }, [tab, subject, callbackGetTab]);

  return (
    <TabContext.Provider value={[tab, setTab]}>
      <div className='classroom'>
        <ClassroomSidebar tabs={subject?.attributes?.tabs} />
        <ClassroomStage />
      </div>
    </TabContext.Provider>
  );
}

export default Classroom;