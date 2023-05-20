/**
 * @file Módulo responsável pela exibição de exercício de codificação.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext } from 'react';
import AnswerContext from '../../Context/AnswerContext/AnswerContext';
import ExerciseContext from '../../Context/ExerciseContext/ExerciseContext';
import CodeEditor from '../CodeEditor/CodeEditor';
import CodeEditorWorkspace from '../CodeEditorWorkspace/CodeEditorWorkspace';
import CodeEditorPrompt from '../CodeEditorPrompt/CodeEditorPrompt';

function CodeExercise() {
  const [currentExercise, setCurrentExercise] = useContext(ExerciseContext);
  const [answersByExercise, setAnswersByExercise] = useContext(AnswerContext);

  /**
   * Método responsável por atualizar resultados (no caso a saída do código executado) por 
   * exercício para posterior avaliação. Considera a última saída apresentada.
   * 
   * @param {object} result 
   */
  function updateResultByExercise(result) {
    if (result[result.length - 1] === undefined) { return; }

    answersByExercise.set(currentExercise.uid, result[result.length - 1]);

    setAnswersByExercise(new Map(answersByExercise));
  }

  return (
    <CodeEditor updateResult={updateResultByExercise} file={currentExercise} setFile={setCurrentExercise}>
      <CodeEditorWorkspace />
      <CodeEditorPrompt />
    </CodeEditor>
  );
}

export default CodeExercise;