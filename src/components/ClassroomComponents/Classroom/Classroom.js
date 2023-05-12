/**
 * @file Módulo responsável pelo carregamento da sala de aula a partir do UUID do 
 * assunto tratado.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useCallback, useEffect, useState } from 'react';
import TabContext from '../../Context/TabContext/TabContext';
import ExerciseContext from '../../Context/ExerciseContext/ExerciseContext';
import ClassroomSidebar from '../ClassroomSidebar/ClassroomSidebar';
import ClassroomStage from '../ClassroomStage/ClassroomStage';
import callouts from '../../../classes/callout';
import util from '../../../classes/util';

function Classroom(props) {
  const [subject, setSubject] = useState(null);
  const [tab, setTab] = useState(null);
  const [exercises, setExercises] = useState(null);

  /**
   * Hook responsável pela obtenção do registro do assunto tratado na tela atual
   * a partir do UUID recebido.
   */
  useEffect(() => { if (!subject) { getSubject(); } });

  async function getSubject() {
    setSubject((await callouts.content.getSubject(props.uuid))?.data?.[0]);
  }

  const callbackGetTab = useCallback(getTab, [getTab]);

  function getTab() {
    setTab(util.getMainTab(subject));
  }

  /**
   * Hook responsável pela obtenção da guia atual dado o registro do assunto 
   * recuperado.
   */
  useEffect(() => { if (!tab && subject) { callbackGetTab(); } }, [tab, subject, callbackGetTab]);

  const callbackGetExercises = useCallback(getExercises, [getExercises]);

  function getExercises() {
    setExercises(util.getExercises(tab));
  }

  /**
   * Hook responsável pela obtenção dos exercícios propostos dado o registro do 
   * assunto recuperado.
   */
  useEffect(() => { if (!exercises && tab) { callbackGetExercises(); } }, [exercises, tab, callbackGetExercises]);

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