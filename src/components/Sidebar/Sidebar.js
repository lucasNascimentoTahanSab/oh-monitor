import React from 'react';

function Sidebar(props) {

  return (
    <nav className='sidebar'>
      {props.children}
    </nav>
  );
}

export default Sidebar;