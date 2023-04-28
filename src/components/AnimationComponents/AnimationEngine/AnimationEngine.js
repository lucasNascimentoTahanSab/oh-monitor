import React, { useCallback, useEffect, useRef, useState } from 'react';
import animate from '../../../classes/animate';

function AnimationEngine(props) {
  const [elements, setElements] = useState([]);
  const animationEngineRef = useRef(null);

  const placeObjectsCallback = useCallback(placeObjects, [placeObjects]);

  function placeObjects() {
    if (!props.play) { return; }
    if (!props.commands.length) { return; }

    executeCommands();
  }

  function executeCommands() {
    animate.execute(props.commands);

    setElements(animate.elements);
  }

  useEffect(placeObjectsCallback, [placeObjectsCallback]);

  return (
    <div className='animation-engine no-select' ref={animationEngineRef}>
      {elements}
      {/* <div className='animation-engine__tree'>
        <span className='animation-engine__node'>12</span>
        <div className='animation-engine__children'>
          <div className='animation-engine__subtree animation-engine__subtree--left'>
            <span className='animation-engine__node'>11</span>
            <div className='animation-engine__children'>
              <div className='animation-engine__subtree animation-engine__subtree--left'>
                <span className='animation-engine__node'>9</span>
                <div className='animation-engine__children'>
                  <div className='animation-engine__subtree animation-engine__subtree--left'>
                    <span className='animation-engine__node'>8</span>
                  </div>
                  <div className='animation-engine__subtree animation-engine__subtree--right'>
                    <span className='animation-engine__node'>10</span>
                    <div className='animation-engine__children'>
                      <div className='animation-engine__subtree animation-engine__subtree--left'>
                        <span className='animation-engine__node'>11</span>
                        <div className='animation-engine__children'>
                          <div className='animation-engine__subtree animation-engine__subtree--left'>
                            <span className='animation-engine__node'>9</span>
                            <div className='animation-engine__children'>
                              <div className='animation-engine__subtree animation-engine__subtree--left'>
                                <span className='animation-engine__node'>8</span>
                                <div className='animation-engine__children'>
                                  <div className='animation-engine__subtree animation-engine__subtree--left'>
                                    <span className='animation-engine__node'>11</span>
                                    <div className='animation-engine__children'>
                                      <div className='animation-engine__subtree animation-engine__subtree--left'>
                                        <span className='animation-engine__node'>9</span>
                                        <div className='animation-engine__children'>
                                          <div className='animation-engine__subtree animation-engine__subtree--left'>
                                            <span className='animation-engine__node'>8</span>
                                          </div>
                                          <div className='animation-engine__subtree animation-engine__subtree--right'>
                                            <span className='animation-engine__node'>10</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='animation-engine__subtree animation-engine__subtree--right'>
                                <span className='animation-engine__node'>10</span>
                                <div className='animation-engine__children'>
                                  <div className='animation-engine__subtree animation-engine__subtree--left'>
                                    <span className='animation-engine__node'>11</span>
                                    <div className='animation-engine__children'>
                                      <div className='animation-engine__subtree animation-engine__subtree--left'>
                                        <span className='animation-engine__node'>9</span>
                                        <div className='animation-engine__children'>
                                          <div className='animation-engine__subtree animation-engine__subtree--left'>
                                            <span className='animation-engine__node'>8</span>
                                          </div>
                                          <div className='animation-engine__subtree animation-engine__subtree--right'>
                                            <span className='animation-engine__node'>10</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='animation-engine__subtree animation-engine__subtree--right'>
            <span className='animation-engine__node'>13</span>
            <div className='animation-engine__children'>
              <div className='animation-engine__subtree animation-engine__subtree--left'>
                <span className='animation-engine__node'>11</span>
                <div className='animation-engine__children'>
                  <div className='animation-engine__subtree animation-engine__subtree--left'>
                    <span className='animation-engine__node'>9</span>
                    <div className='animation-engine__children'>
                      <div className='animation-engine__subtree animation-engine__subtree--left'>
                        <span className='animation-engine__node'>8</span>
                      </div>
                      <div className='animation-engine__subtree animation-engine__subtree--right'>
                        <span className='animation-engine__node'>10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default AnimationEngine;