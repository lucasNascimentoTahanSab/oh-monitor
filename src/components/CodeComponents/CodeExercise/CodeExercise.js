import React, { useContext } from 'react';
import ResultContext from '../../Context/ResultContext/ResultContext';
import ExerciseContext from '../../Context/ExerciseContext/ExerciseContext';
import CodeEditor from '../CodeEditor/CodeEditor';
import CodeEditorWorkspace from '../CodeEditorWorkspace/CodeEditorWorkspace';
import CodeEditorPrompt from '../CodeEditorPrompt/CodeEditorPrompt';

function CodeExercise() {
  const [currentExercise, setCurrentExercise] = useContext(ExerciseContext);
  const [resultByExercise, setResultByExercise] = useContext(ResultContext);

  /**
   * Método responsável por atualizar resultados (no caso a saída do código executado) por 
   * exercício para posterior avaliação. Considera a última saída apresentada.
   * 
   * @param {object} result 
   */
  function updateResultByExercise(result) {
    if (result[result.length - 1] === undefined) { return; }

    resultByExercise.set(currentExercise.uid, result[result.length - 1]);

    setResultByExercise(new Map(resultByExercise));
  }

  return (
    <CodeEditor updateResult={updateResultByExercise} file={currentExercise} setFile={setCurrentExercise}>
      <CodeEditorWorkspace file={currentExercise} />
      <CodeEditorPrompt file={currentExercise} />
    </CodeEditor>
  );
}

export default CodeExercise;