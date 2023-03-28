import React from 'react';

function ButtonDropdown(props) {
  return (
    <svg width={props.width} height={props.height} viewBox={`0 0 ${props.width} ${props.height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.91675 5.25H11.0834L7.4125 8.92092C7.30311 9.03028 7.15476 9.09171 7.00008 9.09171C6.8454 9.09171 6.69706 9.03028 6.58767 8.92092L2.91675 5.25Z" fill={props.fill} />
    </svg>
  );
}

export default ButtonDropdown;