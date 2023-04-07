import React from 'react';
import { ReactComponent as Expand } from '../../../svg/expand.svg';

function ButtonExpand(props) {
  function onClick() {
    if (typeof props.onClick !== 'function') { return; }

    props.onClick();
  }

  return (
    <button onClick={onClick}>
      <Expand
        style={{ height: props.height, width: props.width, minHeight: props.height }}
        alt='Square with only the corners visible in a light color.'
      />
    </button>
  );
}

export default ButtonExpand;