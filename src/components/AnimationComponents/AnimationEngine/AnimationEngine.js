import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DraggerContext } from '../../Context/DraggerContext/DraggerContext.js';
import animation from '../../../classes/animation';

function AnimationEngine(props) {
  const [render, setRender] = useState(false);
  const [play, setPlay] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [snapshots, setSnapshots] = useState([]);
  const [snapshot, setSnapshot] = useState(null);
  const [dragger, setDragger] = useState(null);
  const animationEngine = useRef(null);

  const updateRenderCallback = useCallback(updateRender, [updateRender]);

  function updateRender() {
    setRender(props.render);
  }

  useEffect(updateRenderCallback, [props.render, updateRenderCallback]);

  const updatePlayCallback = useCallback(updatePlay, [updatePlay]);

  function updatePlay() {
    setPlay(props.play);
  }

  useEffect(updatePlayCallback, [props.play, updatePlayCallback]);

  const parseCommandsCallback = useCallback(parseCommands, [parseCommands]);

  function parseCommands() {
    if (typeof props.setRender !== 'function') { return; }

    setSnapshots(animation.parse(props.commands));
    setSnapshot(null);

    props.setRender(false);
  }

  useEffect(() => { if (render) { parseCommandsCallback() } }, [render, parseCommandsCallback]);

  const playTimelineCallback = useCallback(playTimeline, [playTimeline]);

  function playTimeline() {
    if (typeof props.setPlay !== 'function') { return; }
    if (!snapshots?.length) { return; }
    if (!play) { return; }
    if (playing) { return; }

    setSnapshot(null);

    setTimeout(placeElements, 375, 0);

    setPlaying(true);

    props.setPlay(false);
  }

  function placeElements(snapshotNumber) {
    if (snapshotNumber >= snapshots?.length) {
      setPlaying(false);

      return;
    }

    setSnapshot(snapshots[snapshotNumber]);

    setTimeout(placeElements, 375, snapshotNumber + 1);
  }

  useEffect(playTimelineCallback, [play, playTimelineCallback]);

  const setAnimationEngineCallback = useCallback(setAnimationEngine, [setAnimationEngine]);

  function setAnimationEngine() {
    if (typeof props.setAnimationEngine !== 'function') { return; }

    props.setAnimationEngine(animationEngine);
  }

  useEffect(setAnimationEngineCallback, [setAnimationEngineCallback, animationEngine]);

  useEffect(() => { setDragger(props.dragger); }, [props.dragger]);

  return (
    <DraggerContext.Provider value={[dragger, setDragger]}>
      <div className='animation-engine no-select' ref={animationEngine}>{snapshot}</div>
    </DraggerContext.Provider>
  );
}

export default AnimationEngine;