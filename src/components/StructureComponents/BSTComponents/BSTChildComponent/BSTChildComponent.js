/**
 * @file Módulo responsável pela exibição do filho de um nó em BST.
 * @copyright Lucas N. T. Sab 2023
 */
import React from 'react';
import BSTChildrenComponent from '../BSTChildrenComponent/BSTChildrenComponent';
import BSTNodeComponent from '../BSTNodeComponent/BSTNodeComponent';

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
    <div id={`_${props.node?.address}-subtree`} className={`animation-engine__subtree animation-engine__subtree--${props.direction}`}>
      {getNodeElement()}
      {getChildrenElement()}
    </div>
  );
}

export default BSTChildComponent;