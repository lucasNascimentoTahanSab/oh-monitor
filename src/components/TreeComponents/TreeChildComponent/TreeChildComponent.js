import React from 'react';
import TreeChildrenComponent from '../TreeChildrenComponent/TreeChildrenComponent';
import TreeNodeComponent from '../TreeNodeComponent/TreeNodeComponent';

function TreeChildComponent(props) {
  function getNodeElement() {
    if (!props.node) { return null; }

    return <TreeNodeComponent key={`_${props.node.address}`} node={props.node} />;
  }

  function getChildrenElement() {
    if (!props.node?.left && !props.node?.right) { return null; }

    return <TreeChildrenComponent key={`_${props.node.address}-children`} parent={props.node} />;
  }

  return (
    <div id={`_${props.node?.address}-subtree`} className={`animation-engine__subtree animation-engine__subtree--${props.direction}`}>
      {getNodeElement()}
      {getChildrenElement()}
    </div>
  );
}

export default TreeChildComponent;