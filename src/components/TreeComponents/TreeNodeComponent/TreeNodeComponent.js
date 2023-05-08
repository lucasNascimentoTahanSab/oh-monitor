import React, { useRef } from 'react';

function TreeNodeComponent(props) {
  const focus = useRef(null);

  function getFocus() {
    return props.node?.focus ? 'animation-engine__node--focus' : '';
  }

  function getRef() {
    return props.node?.focus ? focus : null;
  }

  return (
    <span id={`_${props.node?.address}`} className={`animation-engine__node ${getFocus()}`} ref={getRef()}>
      {props.node?.value}
    </span>
  );
}

export default TreeNodeComponent;