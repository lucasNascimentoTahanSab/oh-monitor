import React, { useContext, useEffect, useRef, useState } from 'react';
import DraggerContext from '../../../Context/DraggerContext/DraggerContext';

function BSTNodeComponent(props) {
  const [dragger,] = useContext(DraggerContext);
  const [node, setNode] = useState(null);
  const focus = useRef(null);

  useEffect(() => { setNode(props.node) }, [props.node]);

  useEffect(() => { if (node?.focus && focus) { dragger?.focus(focus.current); } }, [node, dragger]);

  function getFocus() {
    return node?.focus ? 'animation-engine__node--focus' : '';
  }

  return (
    <span id={`_${node?.address}`} className={`animation-engine__node ${getFocus()}`} ref={focus}>
      {node?.value}
    </span>
  );
}

export default BSTNodeComponent;