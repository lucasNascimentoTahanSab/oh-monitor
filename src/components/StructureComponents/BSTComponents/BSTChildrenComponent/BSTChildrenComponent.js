/**
 * @file Módulo responsável pela exibição dos filhos de um nó em BST.
 * @copyright Lucas N. T. Sab 2023
 */
import React from 'react';
import BSTChildComponent from '../BSTChildComponent/BSTChildComponent.js';

function BSTChildrenComponent(props) {
  /**
   * Método responsável pela obtenção do filho à esquerda do nó pai.
   * 
   * @returns {array}
   */
  function getLeftChildComponent() {
    if (!props.parent?.left) { return null; }

    return <BSTChildComponent key={`${props.parent.left.address}-subtree`} node={props.parent.left} direction='left' />
  }

  /**
   * Método responsável pela obtenção do filho à direita do nó pai.
   * 
   * @returns {array}
   */
  function getRightChildComponent() {
    if (!props.parent?.right) { return null; }

    return <BSTChildComponent key={`${props.parent.right.address}-subtree`} node={props.parent.right} direction='right' />
  }

  return (
    <div id={`_${props.parent?.address}-children`} className='tcc-bst-children'>
      {getLeftChildComponent()}
      {getRightChildComponent()}
    </div>
  );
}

export default BSTChildrenComponent;
