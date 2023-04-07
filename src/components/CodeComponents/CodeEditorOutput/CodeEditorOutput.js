import React, { useRef } from 'react';

function CodeEditorOutput(props) {
  const contentRef = useRef();
  const resizerRef = useRef();

  let contentInitialHeight = null;
  let contentInitialPosition = null;
  let mouseInitialPosition = null;

  function handleResizerMouseDown(event) {
    event.preventDefault();

    setContentPosition();
    setContentInitialHeight();
    setContentMousePosition(event);

    window.addEventListener('mousemove', handleResizerMouseMove);
    window.addEventListener('mouseup', handleResizerMouseUp);
  }

  function handleResizerMouseUp() {
    window.removeEventListener('mousemove', handleResizerMouseMove);
  }

  function handleResizerMouseMove(event) {
    event.preventDefault();

    contentRef.current.style.height = `${contentInitialHeight - (event.pageY - mouseInitialPosition)}px`;
    contentRef.current.style.top = `${contentInitialPosition + (event.pageY - mouseInitialPosition)}px`;
  }

  function setContentMousePosition(event) {
    mouseInitialPosition = event.pageY;
  }

  function setContentInitialHeight() {
    contentInitialHeight = contentRef?.current.offsetHeight;
  }

  function setContentPosition() {
    const contentBoundaries = contentRef?.current.getBoundingClientRect();

    contentInitialPosition = contentBoundaries.top;
  }

  return (
    <div className='code-editor__output'>
      <div className='code-editor__output-resizer' ref={resizerRef} onMouseDown={handleResizerMouseDown}></div>
      <div className='code-editor__output-content' ref={contentRef}></div>
    </div>
  );
}

export default CodeEditorOutput;