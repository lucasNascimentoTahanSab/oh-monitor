import React, { useCallback, useEffect, useRef, useState } from 'react';

function CodeEditorPromptContent(props) {
  const [content, setContent] = useState(null);
  const contentRef = useRef();

  useEffect(() => setContent(props.content), [props.content]);

  const setContentRefCallback = useCallback(ref => props.setContentRef(ref), [props]);

  useEffect(() => setContentRefCallback(contentRef), [setContentRefCallback]);

  return (
    <div className='prompt__content-inner' ref={contentRef}>
      <div className='prompt__content-inner-container'>
        {content}
      </div>
    </div>
  );
}

export default CodeEditorPromptContent;