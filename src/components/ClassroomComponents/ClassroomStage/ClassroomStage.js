/**
 * @file Módulo responsável pela exibição do conteúdo da guia atual em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext } from 'react';
import ClassroomStageSections from '../ClassroomStageSections/ClassroomStageSections.js';
import ClassroomStageExercises from '../ClassroomStageExercises/ClassroomStageExercises.js';
import TabContext from '../../Context/TabContext/TabContext.js';

function ClassroomStage() {
  const [currentTab,] = useContext(TabContext);

  /**
   * Método responsável pela exibição dos exercícios apresentados pela guia atual,
   * quando existentes.
   * 
   * @returns {ReactElement}
   */
  function getExercises() {
    return currentTab?.exercises?.length ? <ClassroomStageExercises /> : null;
  }

  return (
    <div className='section classroom-screen__content'>
      <ClassroomStageSections />
      {getExercises()}
    </div>
  );
}

export default ClassroomStage;