/**
 * @file Módulo responsável pela exibição do filho de um nó em BST.
 * @copyright Lucas N. T. Sab 2023
 */
import React from 'react';
import BSTChildrenComponent from '../BSTChildrenComponent/BSTChildrenComponent.js';
import BSTNodeComponent from '../BSTNodeComponent/BSTNodeComponent.js';

function BSTChildComponent(props) {
  /**
   * Método responsável pela obtenção do nó para exibição em BST.
   * 
   * @returns {array}
   */
  function getNodeElement() {
    if (!props.node) { return null; }

    return <BSTNodeComponent key={`_${props.node.address}`} node={props.node} />;
  }

  /**
   * Método responsável pela obtenção dos filhos do nó atual para exibição em BST.
   * 
   * @returns {array}
   */
  function getChildrenElement() {
    if (!props.node?.left && !props.node?.right) { return null; }

    return <BSTChildrenComponent key={`_${props.node.address}-children`} parent={props.node} />;
  }

  return (
    <div id={`_${props.node?.address}-subtree`} className={`tcc-bst-child tcc-bst-child--${props.direction}`}>
      {getNodeElement()}
      {getChildrenElement()}
    </div>
  );
}

export default BSTChildComponent;