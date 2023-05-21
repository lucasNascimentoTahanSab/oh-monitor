/**
 * @file Módulo responsável pela exibição de um nó em BST.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useRef, useState } from 'react';
import DraggerContext from '../../../Context/DraggerContext/DraggerContext.js';

function BSTNodeComponent(props) {
  const [dragger,] = useContext(DraggerContext);
  const [node, setNode] = useState(null);
  const nodeRef = useRef(null);

  useEffect(() => { setNode(props.node) }, [props.node]);

  /**
   * Hook responsável por posicionar nó atual ao centro da tela, pô-lo em foco.
   */
  useEffect(() => {
    if (!node?.focus || !nodeRef) { return; }

    dragger?.focus(nodeRef.current);
  }, [node, dragger]);

  /**
   * Método responsável pela obtenção da classe associada ao foco sobre o nó
   * atual.
   * 
   * @returns {string}
   */
  function getFocus() {
    return node?.focus ? 'tcc-bst-node--focus' : '';
  }

  return (
    <div id={`_${node?.address}`} className={`tcc-bst-node ${getFocus()}`} title={node?.value} ref={nodeRef}>
      <span className='tcc-truncate-string'>{node?.value}</span>
    </div>
  );
}

export default BSTNodeComponent;