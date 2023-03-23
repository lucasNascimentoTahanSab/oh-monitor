import React, { useState } from 'react';
import ExerciseAnswer from '../ExerciseAnswer/ExerciseAnswer';

function ExerciseQuestion(props) {
  const [answers, setAnswers] = useState(props.answers);
  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);;

  function selectAnswer(letter) {
    unselectCurrentAnswer();
    selectAnswerByLetter(letter);
    setAnswers(answers);

    // Verificar por melhor prática ao atualizar componente
    forceUpdate();
  }

  function selectAnswerByLetter(letter) {
    const item = getAnswerByLetter(letter);

    if (!item) { return; }

    item.selected = true;
  }

  function unselectCurrentAnswer() {
    const item = getSelectedAnswer();

    if (!item) { return; }

    item.selected = false;
  }

  function getSelectedAnswer() {
    return answers.find(answer => answer.selected);
  }

  function getAnswerByLetter(letter) {
    return answers.find(answer => answer.letter === letter);
  }

  function getQuestionAnswers() {
    if (!Array.isArray(answers)) { return null; }

    return answers.map(answer => (
      <ExerciseAnswer key={answer.letter} letter={answer.letter} statement={answer.statement} selected={answer.selected} selectAnswer={selectAnswer} />
    ));
  }

  return (
    <li className='exercise__question-statement'>
      <span>Quanto aos conceitos de árvore binária, assinale a alternativa correta.</span>
      <ul className='exercise__question-answers'>
        {getQuestionAnswers()}
      </ul>
    </li>
  );
}

export default ExerciseQuestion;