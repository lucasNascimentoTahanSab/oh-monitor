import React from 'react';

function AnimationScreen(props) {
  function getAnimationScreenClass() {
    return `code-snippet__animation ${props?.theme === 'dark' ? 'background-color--color-blue--dark' : 'background-color--color-blue--light'}`
  }

  return (
    <div className={getAnimationScreenClass()}>
      <div className='animation-screen__screen'></div>
      <div className='animation-screen__control'></div>
    </div>
  );
}

export default AnimationScreen;