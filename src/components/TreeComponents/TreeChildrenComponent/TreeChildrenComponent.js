import React from 'react';
import TreeChildComponent from '../TreeChildComponent/TreeChildComponent';

function TreeChildrenComponent(props) {
  function getLeftChildComponent() {
    if (!props.parent?.left) { return null; }

    return <TreeChildComponent key={`${props.parent.left.address}-subtree`} node={props.parent.left} direction='left' />
  }

  function getRightChildComponent() {
    if (!props.parent?.right) { return null; }

    return <TreeChildComponent key={`${props.parent.right.address}-subtree`} node={props.parent.right} direction='right' />
  }

  return (
    <div id={`_${props.parent?.address}-children`} className='animation-engine__children'>
      {getLeftChildComponent()}
      {getRightChildComponent()}
    </div>
  );
}

export default TreeChildrenComponent;
