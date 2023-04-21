import React from 'react';
import { ReactComponent as Play } from '../../../svg/play.svg';

function ButtonPlay(props) {
  function onClick() {
    if (typeof props.onClick !== 'function') { return; }

    props.onClick();
  }

  return (
    <button onClick={onClick}>
      <Play
        style={{ height: props.height, width: props.width, minHeight: props.height }}
        alt='Blue triangle with two straight corners and one rounded corner pointing to the right.'
      />
    </button>
  );
}

export default ButtonPlay;