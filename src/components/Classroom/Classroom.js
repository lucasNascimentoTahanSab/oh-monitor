import React, { useState } from 'react';
import { ContentContext } from '../ContentContext/ContentContext';
import ClassroomContent from '../ClassroomContent/ClassroomContent';
import ClassroomSidebar from '../ClassroomSidebar/ClassroomSidebar';
import { contents } from '../../classes/Content';

function Classroom(props) {
  const [content, setContent] = useState(contents['main']);

  return (
    <ContentContext.Provider value={[content, setContent]}>
      <div className='classroom'>
        <ClassroomSidebar
          items={[
            { label: 'Árvores binárias de busca', selected: true, screen: 'main' },
            { label: 'Prática', selected: false, screen: 'practice' },
            { label: 'Criativo', selected: false, screen: 'creative' }
          ]} />
        <ClassroomContent />
      </div>
    </ContentContext.Provider>
  );
}

export default Classroom;