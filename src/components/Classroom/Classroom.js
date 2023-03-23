import React, { useState } from 'react';
import { ContentContext } from '../ContentContext/ContentContext';
import ClassroomScreen from '../ClassroomScreen/ClassroomScreen';
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
        <ClassroomScreen
          content={{}}
          questions={[
            {
              number: '1',
              statement: 'Quanto aos conceitos de árvore binária, assinale a alternativa correta.',
              answers: [
                {
                  letter: 'A',
                  statement: 'Operações que utilizam recursão não podem ser realizadas sobre árvores binárias.',
                  selected: false
                },
                {
                  letter: 'B',
                  statement: 'A árvore pode ser vazia, isto é, não ter nenhum elemento.',
                  selected: false
                },
                {
                  letter: 'C',
                  statement: 'Uma árvore estritamente binária com n folhas tem 2n² - 1 nós.',
                  selected: false
                },
                {
                  letter: 'D',
                  statement: 'A altura de um nó é o comprimento do menor caminho do nó até o seu primeiro descendente.',
                  selected: false
                },
                {
                  letter: 'E',
                  statement: 'Uma árvore binária completa possui, no máximo, oito nós.',
                  selected: false
                }
              ]
            },
            {
              number: '2',
              statement: 'Quanto aos conceitos de árvore binária, assinale a alternativa correta.',
              answers: [
                {
                  letter: 'A',
                  statement: 'Operações que utilizam recursão não podem ser realizadas sobre árvores binárias.',
                  selected: false
                },
                {
                  letter: 'B',
                  statement: 'A árvore pode ser vazia, isto é, não ter nenhum elemento.',
                  selected: false
                },
                {
                  letter: 'C',
                  statement: 'Uma árvore estritamente binária com n folhas tem 2n² - 1 nós.',
                  selected: false
                },
                {
                  letter: 'D',
                  statement: 'A altura de um nó é o comprimento do menor caminho do nó até o seu primeiro descendente.',
                  selected: false
                },
                {
                  letter: 'E',
                  statement: 'Uma árvore binária completa possui, no máximo, oito nós.',
                  selected: false
                }
              ]
            }
          ]} />
      </div>
    </ContentContext.Provider>
  );
}

export default Classroom;