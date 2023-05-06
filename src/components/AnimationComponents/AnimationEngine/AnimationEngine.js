import React, { useCallback, useEffect, useState } from 'react';
import animation from '../../../classes/animation';

function AnimationEngine(props) {
  const [render, setRender] = useState(false);
  const [play, setPlay] = useState(false);
  const [elements, setElements] = useState([]);
  const [timeline, setTimeline] = useState(null);

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

  const placeElementsCallback = useCallback(placeElements, [placeElements]);

  function placeElements() {
    if (typeof props.setRender !== 'function') { return; }

    setElements(animation.parse(props.commands));
    setTimeline(animation.draw(props.commands));

    props.setRender(false);
  }

  useEffect(() => { if (render) { placeElementsCallback() } }, [render, placeElementsCallback]);

  const playTimelineCallback = useCallback(playTimeline, [playTimeline]);

  function playTimeline() {
    if (!play) { return; }

    timeline?.play();
  }

  useEffect(playTimelineCallback, [play, playTimelineCallback]);

  return (
    <div className='animation-engine no-select'>{elements}</div>
  );
}

export default AnimationEngine;