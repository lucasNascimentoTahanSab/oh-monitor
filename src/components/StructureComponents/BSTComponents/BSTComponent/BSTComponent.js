/**
 * @file Módulo responsável pela exibição de BST.
 * @copyright Lucas N. T. Sab 2023
 */
import React from 'react';
import BSTChildrenComponent from '../BSTChildrenComponent/BSTChildrenComponent.js';
import BSTNodeComponent from '../BSTNodeComponent/BSTNodeComponent.js';

function BSTComponent(props) {
  /**
   * Método responsável pela obtenção do nó raiz para exibição em BST.
   * 
   * @returns {array}
   */
  function getNodeElement() {
    if (!props.tree?.root) { return null; }

    return <BSTNodeComponent key={`_${props.tree.root.address}`} node={props.tree.root} />;
  }

  /**
   * Método responsável pela obtenção dos filhos do nó raiz para exibição em BST.
   * 
   * @returns {array}
   */
  function getChildrenElement() {
    if (!props.tree?.root?.left && !props.tree?.root?.right) { return null; }

    return <BSTChildrenComponent key={`_${props.tree.root.address}-children`} parent={props.tree.root} />;
  }

  return (
    <div id={`_${props.tree?.address}`} className='tcc-bst'>
      {getNodeElement()}
      {getChildrenElement()}
    </div>
  );
}

export default BSTComponent;