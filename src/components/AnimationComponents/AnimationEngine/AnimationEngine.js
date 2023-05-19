/**
 * @file Módulo responsável pela exibição da animação montada em Animation.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import RenderContext from '../../Context/RenderContext/RenderContext.js';
import DraggerContext from '../../Context/DraggerContext/DraggerContext.js';
import Drawer from '../../../classes/drawer/Drawer.js';
import Util from '../../../classes/util/Util.js';

function AnimationEngine(props) {
  const [render, setRender] = useContext(RenderContext);
  const [commands, setCommands] = useState([]);
  const [dragger, setDragger] = useState(null);
  const [snapshot, setSnapshot] = useState(null);
  const animationEngine = useRef(null);

  useEffect(() => { setCommands(props.commands) }, [props.commands]);

  useEffect(() => { setDragger(props.dragger); }, [props.dragger]);

  useEffect(() => { setSnapshot(props.snapshot) }, [props.snapshot]);

  /**
   * Hook responsável por configurar tela em dragger.
   */
  useEffect(() => { Util.handle(props.setAnimationEngine, animationEngine); }, [props.setAnimationEngine, animationEngine]);

  const parseCommandsCallback = useCallback(parseCommands, [parseCommands]);

  function parseCommands() {
    const result = Drawer.draw('BST').with(commands);

    Util.handle(props.setSnapshots, result);

    setCommands([]);
    setRender(false);
  }

  /**
   * Hook responsável por disparar construção da animação a ser apresentada quando
   * comandos gerados.
   */
  useEffect(() => { if (render && commands?.length) { parseCommandsCallback() } }, [render, commands, parseCommandsCallback]);

  return (
    <DraggerContext.Provider value={[dragger, setDragger]}>
      <div className='animation-engine no-select' ref={animationEngine}>{snapshot}</div>
    </DraggerContext.Provider>
  );
}

export default AnimationEngine;