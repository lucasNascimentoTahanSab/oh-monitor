import React, { useCallback, useEffect, useRef, useState } from 'react';

function CodeEditorPromptContent(props) {
  const [content, setContent] = useState(null);
  const contentRef = useRef();

  useEffect(() => setContent(props.content), [props.content]);

  const setContentRefCallback = useCallback(ref => props.setContentRef(ref), [props]);

  useEffect(() => setContentRefCallback(contentRef), [setContentRefCallback]);

  function getContent() {
    if (!content?.length) { return null; }

    return content.map(item => item);
  }

  return (
    <div className='prompt__content-inner' ref={contentRef}>
      <div className='prompt__content-inner-container'>
        {getContent()}
      </div>
    </div>
  );
}

export default CodeEditorPromptContent;