import React, { useCallback, useEffect, useRef, useState } from 'react';
import animate from '../../../classes/animate';

function AnimationEngine(props) {
  const [elements, setElements] = useState([]);
  const animationEngineRef = useRef(null);

  const executeCommandsCallback = useCallback(executeCommands, [executeCommands]);

  function executeCommands() {
    animate.execute(props.commands);
  }

  useEffect(() => executeCommandsCallback(), [executeCommandsCallback, props.commands]);

  const placeObjectsCallback = useCallback(placeObjects, [placeObjects]);

  function placeObjects() {
    if (!props.play) { return; }

    setElements(animate.elements);
  }

  useEffect(placeObjectsCallback, [placeObjectsCallback]);

  return (
    <div className='animation-engine no-select' ref={animationEngineRef}>{elements}</div>
  );
}

export default AnimationEngine;