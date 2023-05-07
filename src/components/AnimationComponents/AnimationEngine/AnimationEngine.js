import React, { useCallback, useEffect, useState } from 'react';
import animation from '../../../classes/animation';

function AnimationEngine(props) {
  const [render, setRender] = useState(false);
  const [play, setPlay] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [snapshots, setSnapshots] = useState([]);
  const [elements, setElements] = useState([]);

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
    setElements([]);

    props.setRender(false);
  }

  useEffect(() => { if (render) { parseCommandsCallback() } }, [render, parseCommandsCallback]);

  const playTimelineCallback = useCallback(playTimeline, [playTimeline]);

  function playTimeline() {
    if (!snapshots?.length) { return; }
    if (!play) { return; }
    if (playing) { return; }

    setTimeout(placeElements, 500, 0);

    setPlaying(true);
  }

  function placeElements(snapshotNumber) {
    if (snapshotNumber >= snapshots?.length) {
      setPlaying(false);

      return;
    }

    setElements(snapshots[snapshotNumber]);

    setTimeout(placeElements, 500, snapshotNumber + 1);
  }

  useEffect(playTimelineCallback, [play, playTimelineCallback]);

  return (
    <div className='animation-engine no-select'>{elements}</div>
  );
}

export default AnimationEngine;