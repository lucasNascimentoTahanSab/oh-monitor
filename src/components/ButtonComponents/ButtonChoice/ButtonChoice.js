/**
 * @file Módulo responsável pela exibição de botão de alternativa para questão de
 * múltipla escolha.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useState } from 'react';
import Util from '../../../classes/util/Util.js';

function ButtonChoice(props) {
  const [state, setState] = useState(null);

  useEffect(() => { setState(props.state); }, [props.state]);

  function getLetterClass() {
    return `tcc-button-choice ${getLetterAditionalStyling()} tcc-no-select`;
  }

  function getLetterAditionalStyling() {
    if (state?.wrong) { return 'tcc-button-choice--wrong'; }
    if (state?.correct) { return 'tcc-button-choice--correct'; }
    if (state?.current) { return 'tcc-button-choice--selected'; }

    return '';
  }

  return (
    <button className={getLetterClass()} disabled={props.disabled} onClick={event => Util.handle(props.onClick, event)}>
      {Util.getLetterByIndex(props.index)}
    </button>
  );
}

export default ButtonChoice;