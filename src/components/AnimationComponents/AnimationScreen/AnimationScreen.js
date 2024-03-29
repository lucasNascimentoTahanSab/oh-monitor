/**
 * @file Módulo responsável pela exibição do HUB de animações.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import AnimationEngine from '../AnimationEngine/AnimationEngine.js';
import ButtonPlay from '../../ButtonComponents/ButtonPlay/ButtonPlay.js';
import InputRange from '../../InputComponents/InputRange/InputRange.js';
import ButtonExpand from '../../ButtonComponents/ButtonExpand/ButtonExpand.js';
import RenderContext from '../../Context/RenderContext/RenderContext.js';
import Dragger from '../../../classes/util/Dragger.js';
import Fullscreen from '../../../classes/util/Fullscreen.js';
import Util from '../../../classes/util/Util.js';
import config from '../../../config.json';

function AnimationScreen(props) {
  const [, setRender] = useContext(RenderContext);
  const [commands, setCommands] = useState([]);
  const [play, setPlay] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [dragger, setDragger] = useState(null);
  const [snapshots, setSnapshots] = useState([]);
  const [snapshot, setSnapshot] = useState([]);
  const [animationEngine, setAnimationEngine] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [finished, setFinished] = useState(false);
  const [reset, setReset] = useState(false);
  const [timer, setTimer] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenOperator,] = useState(new Fullscreen(setFullscreen));
  const animationCameraRef = useRef(null);
  const animationScreenRef = useRef(null);

  useEffect(() => { setCommands(props.commands) }, [props.commands]);

  /**
   * Hook responsável pela atualização do dragger para possibilitar arrastar pela tela e
   * focar em elementos expecíficos.
   */
  useEffect(() => {
    if (!animationCameraRef) { return; }
    if (!animationEngine) { return; }

    setDragger(new Dragger(animationCameraRef.current, animationEngine.current));
  }, [animationEngine]);

  useEffect(() => {
    if (fullscreen) { fullscreenOperator.open(animationScreenRef.current, setFullscreen); }
    else { fullscreenOperator.close(animationScreenRef.current); }
  }, [fullscreenOperator, fullscreen]);

  const pauseTimelineCallback = useCallback(pauseTimeline, [pauseTimeline]);

  /**
   * Hook responsável por interromper a animação antes de reiniciá-la.
   */
  useEffect(() => {
    if (!reset) { return; }

    pauseTimelineCallback();
  }, [reset, pauseTimelineCallback]);

  const resetTimelineCallback = useCallback(resetTimeline, [resetTimeline]);

  function resetTimeline() {
    if (timer) { clearInterval(timer); }

    setPlay(true);
    setPlaying(true);
    setSnapshot(null);
    setCurrentTime(0);
    setInitialTime(Date.now());
    setFinalTime(Date.now() + totalTime);
    setTimer(setInterval(countTimer, 1));
    setFinished(false);
    setReset(false);
  }

  /**
   * Hook responsável por interromper a animação antes de reiniciá-la.
   */
  useEffect(() => {
    if (!reset) { return; }
    if (!totalTime) { return; }
    if (!snapshots?.length) { return; }
    if (playing) { return; }

    resetTimelineCallback();
  }, [reset, totalTime, snapshots, playing, resetTimelineCallback]);

  function configureSnapshots(result) {
    setReset(true);
    setSnapshot(null);
    setSnapshots(result);
    setTotalTime(result?.length * config.animation.duration);

    Util.handle(props.clearCommands);
  }

  /**
   * Método responsável por configurar um novo momento de execução para a animação.
   * 
   * @param {object} event 
   */
  function onInputRangeChange(event) {
    setPlaying(false);
    setCurrentTime(event.target.value);
    updateFinished(event);
    placeElements(getNewSnapshotNumber(event.target.value));
  }

  /**
   * Método responsável por atualizar estado atual da animação (se terminada ou não)
   * durante atualização do progresso.
   * 
   * @param {object} event 
   */
  function updateFinished(event) {
    if (event.target.value === totalTime) { setFinished(true); }
    else if (finished) { setFinished(false); }
  }

  /**
   * Método responsável por confirmar novo ponto de início em timeline enquanto
   * em execução.
   * 
   * @returns 
   */
  function onInputMouseUp() {
    if (!play) { return; }

    playTimeline();
  }

  /**
   * Método responsável por possibilitar movimentação pela tela por meio do mouse.
   * 
   * @param {object} event 
   * @returns 
   */
  function handleScreenMouseDown(event) {
    if (typeof animationEngine?.current !== 'object') { return; }

    dragger.drag(event);
  }

  /**
   * Método responsável por alternar execução do timeline (em andamento/pausado).
   */
  function toggleTimeline() {
    if (play) { pauseTimeline(); }
    else if (totalTime > 0) { playTimeline(); }
    else { buildTimeline(); }
  }

  /**
   * Método responsável por iniciar reprodução de timeline quando timeline ainda
   * não tiver sido construído, porém já houverem comandos.
   * 
   * @returns 
   */
  function buildTimeline() {
    if (!commands.length) { return; }

    setRender(true);
  }

  /**
   * Método responsável por iniciar ou prosseguir com execução do timeline.
   * 
   * @returns 
   */
  function playTimeline() {
    if (playing) { return; }
    if (timer) { clearInterval(timer); }

    setPlay(true);
    setPlaying(true);
    setSnapshot(finished ? null : snapshot);
    setCurrentTime(finished ? 0 : currentTime);
    setInitialTime(finished ? Date.now() : Date.now() - currentTime);
    setFinalTime(finished ? Date.now() + totalTime : (Date.now() - currentTime) + totalTime);
    setTimer(setInterval(countTimer, 1));
    setFinished(false);
  }

  /**
   * Método responsável por atualizar a animação em execução, disparando a cada 
   * milissegundo.
   */
  function countTimer() {
    if (!Util.getCurrentStateValue(playing, setPlaying)) { clearIntervalWhenNotPlaying(); }
    else if (isTimeOver()) { clearIntervalWhenTimeIsOver(); }
    else { setCurrentTimeWhenPlaying(); }
  }

  /**
   * Método responsável por atualizar tempo atual da animação e posicionar os elementos
   * de acordo.
   */
  function setCurrentTimeWhenPlaying() {
    const newCurrentTimeValue = getNewCurrentTimeValue();
    const newSnapshotNumber = getNewSnapshotNumber(newCurrentTimeValue);

    setCurrentTime(newCurrentTimeValue);
    placeElements(newSnapshotNumber);
  }

  /**
   * Método responsável por interromper contador quando tempo da animação tiver se 
   * esgotado.
   */
  function clearIntervalWhenTimeIsOver() {
    setPlay(false);
    setPlaying(false);
    setFinished(true);

    clearInterval(Util.getCurrentStateValue(timer, setTimer));
  }

  function isTimeOver() {
    return Date.now() > Util.getCurrentStateValue(finalTime, setFinalTime);
  }

  /**
   * Método responsável por interromper cronômetro enquanto o timeline não estiver
   * em execução.
   */
  function clearIntervalWhenNotPlaying() {
    clearInterval(Util.getCurrentStateValue(timer, setTimer));
  }

  /**
   * Método responsável por posicionar elementos do quadro, na posição escolhida, de
   * acordo com tempo de execução.
   * 
   * @param {number} snapshotNumber 
   * @returns 
   */
  function placeElements(snapshotNumber) {
    if (snapshotNumber > snapshots?.length - 1) { return; }

    setSnapshot(snapshots[snapshotNumber]);
  }

  /**
   * Método responsável pelo cálculo do número do quadro a ser exebido de acordo com
   * tempo recebido. O cálculo se dá pela razão entre o tempo atual e tempo total de 
   * animação, arredondado para baixo.
   * 
   * @param {number} currentTimeValue 
   * @returns {number}
   */
  function getNewSnapshotNumber(currentTimeValue) {
    return Math.floor(currentTimeValue / config.animation.duration);
  }

  /**
   * Método responsável pela obtenção do tempo atual em animação.
   * 
   * @returns {number}
   */
  function getNewCurrentTimeValue() {
    const initialTimeValue = Util.getCurrentStateValue(initialTime, setInitialTime);
    const finalTimeValue = Util.getCurrentStateValue(finalTime, setFinalTime);
    const currentTimeValue = Util.getCurrentStateValue(currentTime, setCurrentTime);
    const newCurrentTimeValue = Date.now() - initialTimeValue ?? currentTimeValue;

    return newCurrentTimeValue > finalTimeValue ? finalTimeValue : newCurrentTimeValue;
  }

  function pauseTimeline() {
    if (!playing) { return; }

    setPlay(false);
    setPlaying(false);

    clearInterval(timer);
  }

  function getClassName() {
    return `tcc-animation-screen ${fullscreen ? 'tcc-animation-screen--fullscreen' : ''}`;
  }

  return (
    <div className={getClassName()} ref={animationScreenRef}>
      <div className='tcc-animation-screen__camera' ref={animationCameraRef} onMouseDown={handleScreenMouseDown}>
        <AnimationEngine
          commands={commands}
          setAnimationEngine={setAnimationEngine}
          setSnapshots={configureSnapshots}
          setReset={setReset}
          snapshot={snapshot}
          dragger={dragger} />
      </div>
      <div className='tcc-animation-screen__control'>
        <ButtonPlay height='1.5rem' width='1.5rem' color='#3498DB' onClick={toggleTimeline} playing={playing} />
        <InputRange max={totalTime} value={currentTime} onChange={onInputRangeChange} onMouseUp={onInputMouseUp} />
        <ButtonExpand height='1.5rem' width='1.5rem' color='#3498DB' onClick={() => setFullscreen(!fullscreen)} />
      </div>
    </div>
  );
}

export default AnimationScreen;