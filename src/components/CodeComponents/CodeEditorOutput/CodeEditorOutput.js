import React, { useRef } from 'react';
import resize from '../../../classes/resize';

function CodeEditorOutput(props) {
  const contentRef = useRef();

  function getOutput() {
    if (!props.output?.length) { return null; }

    return props.output.map(item => item);
  }

  return (
    <div className='code-editor__output'>
      <div className='code-editor__output-resizer' onMouseDown={event => resize(event, contentRef.current)}></div>
      <div className='code-editor__output-content' ref={contentRef}>
        <div className='code-editor__output-inner'>
          {getOutput()}
        </div>
      </div>
    </div>
  );
}

export default CodeEditorOutput;