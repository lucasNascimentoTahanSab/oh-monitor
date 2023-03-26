import React from 'react';
import SubjectSection from '../SubjectSection/SubjectSection';

function Subject(props) {
  function getSections() {
    if (!Array.isArray(props.subject?.sections?.data)) { return null; }

    return props.subject.sections.data.map(section => <SubjectSection key={section.id} section={section.attributes} />);
  }

  return (
    <section className='classroom__content'>
      <h2>{props.subject?.title}</h2>
      <div className='classroom__content-sections'>
        {getSections()}
      </div>
    </section>
  );
}

export default Subject;