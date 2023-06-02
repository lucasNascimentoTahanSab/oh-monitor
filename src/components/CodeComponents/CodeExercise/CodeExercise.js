/**
 * @file Módulo responsável pela exibição de exercício de codificação.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext } from 'react';
import UserContext from '../../Context/UserContext/UserContext.js';
import AnswerContext from '../../Context/AnswerContext/AnswerContext';
import ExerciseContext from '../../Context/ExerciseContext/ExerciseContext';
import CodeEditor from '../CodeEditor/CodeEditor';
import CodeEditorWorkspace from '../CodeEditorWorkspace/CodeEditorWorkspace';
import CodeEditorPrompt from '../CodeEditorPrompt/CodeEditorPrompt';

function CodeExercise() {
  const [user, setUser] = useContext(UserContext);
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

  function updateExercise(exercise) {
    setCurrentExercise(exercise);
    updateUserStateWithExercise(exercise);
  }

  /**
   * Método responsável pela atualização de exercício em estado do usuário
   * para registro.
   * 
   * @param {object} exercise 
   */
  function updateUserStateWithExercise(exercise) {
    user.state.exercises.set(exercise.uid, exercise);

    setUser({ ...user, state: { ...user.state, exercises: user.state.exercises } });
  }

  return (
    <CodeEditor updateResult={updateResultByExercise} file={currentExercise} setFile={updateExercise}>
      <CodeEditorWorkspace />
      <CodeEditorPrompt />
    </CodeEditor>
  );
}

export default CodeExercise;