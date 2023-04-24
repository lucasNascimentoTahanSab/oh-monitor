import React, { useCallback, useEffect, useRef, useState } from 'react';
import animate from '../../../classes/animate';

function AnimationEngine(props) {
  const [objects, setObjects] = useState(new Map());
  const animationEngineRef = useRef(null);

  const placeObjectsCallback = useCallback(placeObjects, [placeObjects]);

  function placeObjects() {
    if (!props.play) { return; }
    if (!props.commands.length) { return; }

    executeCommands();
  }

  function executeCommands() {
    props.commands.forEach(animate.execute);

    setObjects(animate.objects);
  }

  useEffect(placeObjectsCallback, [placeObjectsCallback]);

  function getObjects() {
    if (!objects.size) { return null; }

    return Array.from(objects.values());
  }

  return (<div className='animation-engine' ref={animationEngineRef}>{getObjects()}</div>);
}

export default AnimationEngine;