import React from 'react';
import TreeChildrenComponent from '../TreeChildrenComponent/TreeChildrenComponent';
import TreeNodeComponent from '../TreeNodeComponent/TreeNodeComponent';

function TreeComponent(props) {
  function getNodeElement() {
    if (!props.tree?.root) { return null; }

    return <TreeNodeComponent key={`_${props.tree.root.address}`} node={props.tree.root} />;
  }

  function getChildrenElement() {
    if (!props.tree?.root?.left && !props.tree?.root?.right) { return null; }

    return <TreeChildrenComponent key={`_${props.tree.root.address}-children`} parent={props.tree.root} />;
  }

  return (
    <div id={`_${props.tree?.address}`} className='animation-engine__tree'>
      {getNodeElement()}
      {getChildrenElement()}
    </div>
  );
}

export default TreeComponent;