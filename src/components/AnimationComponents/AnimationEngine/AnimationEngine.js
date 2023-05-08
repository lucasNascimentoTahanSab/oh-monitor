import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DraggerContext } from '../../Context/DraggerContext/DraggerContext.js';
import animation from '../../../classes/animation';

function AnimationEngine(props) {
  const [render, setRender] = useState(false);
  const [snapshot, setSnapshot] = useState(null);
  const [dragger, setDragger] = useState(null);
  const animationEngine = useRef(null);

  const setAnimationEngineCallback = useCallback(setAnimationEngine, [setAnimationEngine]);

  function setAnimationEngine() {
    if (typeof props.setAnimationEngine !== 'function') { return; }

    props.setAnimationEngine(animationEngine);
  }

  useEffect(setAnimationEngineCallback, [setAnimationEngineCallback, animationEngine]);

  useEffect(() => { setDragger(props.dragger); }, [props.dragger]);

  useEffect(() => { setRender(props.render) }, [props.render]);

  const parseCommandsCallback = useCallback(parseCommands, [parseCommands]);

  function parseCommands() {
    if (typeof props.setRender !== 'function') { return; }
    if (typeof props.setSnapshots !== 'function') { return; }
    if (typeof props.setSnapshot !== 'function') { return; }

    const result = animation.parse(props.commands);

    props.setRender(false);
    props.setSnapshots(result);
    props.setSnapshot(null);
  }

  useEffect(() => { if (render) { parseCommandsCallback() } }, [render, parseCommandsCallback]);

  useEffect(() => { setSnapshot(props.snapshot) }, [props.snapshot]);

  return (
    <DraggerContext.Provider value={[dragger, setDragger]}>
      <div className='animation-engine no-select' ref={animationEngine}>{snapshot}</div>
    </DraggerContext.Provider>
  );
}

export default AnimationEngine;