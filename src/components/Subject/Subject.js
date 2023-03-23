import React from 'react';

function Subject(props) {
  return (
    <section className='classroom__content'>
      <h2>Árvores binárias de busca</h2>
      <div className='classroom__content-sections'>
        <section className='classroom__content-section'>
          <h3>O que é uma árvore binária de busca?</h3>
          <div className='classroom__content-section-item'>
            <p>Uma árvore é uma estrutura de dados composta de nós, com as seguintes características:</p>
            <ol>
              <li>Cada árvore tem um nó raiz em seu ponto superior (também conhecido como Nó Pai) contendo algum valor (com qualquer tipo de dados).</li>
              <li>O nó raiz tem zero ou mais 'nós filhos'.</li>
              <li>Cada nó filho tem zero ou mais 'nós filhos' e assim por diante. Isso cria uma subárvore interna à árvore. Cada nó tem sua própria subárvore feita dos filhos e dos filhos dos filhos e assim por diante. Isso quer dizer que cada nó pode ser uma árvore por si só.</li>
            </ol>
            <p>Uma árvore binária de busca (ou BST, do inglês binary search tree) tem, além disso, as duas características abaixo:</p>
            <ol>
              <li>Cada nó pode ter, no máximo, dois filhos.</li>
              <li>Para cada nó, os valores de seus descendentes da esquerda são inferiores ao valor do nó atual, que, por sua vez, é inferior aos nós descendentes da direita (se existirem).</li>
            </ol>
            <p>As BST tem como base a ideia do algoritmo de busca binária, que permite uma procura, inserção e remoção rápidas dos nós. A maneira como estão configurados representa, em média, que cada comparação permite que as operações evitem passar por cerca de metade da árvore. Assim, cada procura, inserção ou remoção leva um tempo proporcional ao logaritmo do número de itens armazenados na árvore, O(log n). Entretanto, em algumas situações, podemos ter o pior dos casos, em que a árvore não está balanceada e a complexidade de tempo passa a ser O(n) para essas três funções. É por isso que árvores autobalanceadas (AVL, rubro-negra etc.) são muito mais eficazes que a BST básica.
              Exemplo de cenário com o pior caso: isso pode acontecer quando você segue adicionando nós que são sempre maiores do que o nó anterior (seu pai). A mesma situação pode acontecer quando você sempre adiciona nós com valores inferiores aos de seus nós pai.</p>
          </div>
        </section>
        <section className='classroom__content-section'>
          <h3>Operações básicas em uma BST</h3>
          <div className='classroom__content-section-item'>
            <ul>
              <li>Criar: cria uma árvore vazia.</li>
              <li>Inserir: insere um nó na árvore.</li>
              <li>Pesquisar: pesquisa por um nós na árvore.</li>
              <li>Excluir: exclui um nó da árvore.</li>
              <li>Travessia em ordem: faz a travessia da árvore na ordem.</li>
              <li>Travessia pré-ordem: faz a travessia da árvore pré-ordem.</li>
              <li>Travessia pós-ordem: faz a travessia da árvore pós-ordem.</li>
            </ul>
          </div>
        </section>
        <section className='classroom__content-section'>
          <h3>Criar</h3>
          <div className='classroom__content-section-item'>
            <p>Inicialmente, uma árvore vazia e sem nós é criada. A variável/identificador que deve apontar para o nó raiz é inicializado com o valor NULL.</p>
          </div>
        </section>
        <section className='classroom__content-section'>
          <h3>Pesquisar</h3>
          <div className='classroom__content-section-item'>
            <p>Sempre começamos a pesquisa em uma árvore pelo nó raiz e descemos a partir dele. Você compara os dados em cada nó com o valor que você está buscando. Se o nó comparado não corresponder, seguimos para o nó filho da direita ou da esquerda, dependendo do resultado da comparação seguinte: se o nó que buscamos for inferior àquele com o qual estamos comparando, seguimos para o filho da esquerda. Do contrário (se for maior) vamos para o filho da direita. Por quê? Porque a BST é estruturada (por definição) de modo que o filho da direita sempre seja maior que o pai e que o filho da esquerda sempre seja menor.</p>
          </div>
        </section>
        <section className='classroom__content-section'>
          <h3>Inserir</h3>
          <div className='classroom__content-section-item'>
            <p>É muito semelhante à função de pesquisar. Novamente, começamos do nó raiz da árvore e descemos de modo recursivo, procurando pelo local certo para inserir o novo nó, do mesmo modo que explicamos na função de pesquisar. Se um nó com o mesmo valor já existir na árvore, é possível escolher inserir a duplicata ou não. Algumas árvores permitem duplicatas, outras não. Isso depende da implementação.</p>
          </div>
        </section>
        <section className='classroom__content-section'>
          <h3>Excluir</h3>
          <div className='classroom__content-section-item'>
            <p>Há 3 casos que podem acontecer quando você tenta excluir um nós. Ele pode,</p>
            <ol>
              <li>não ter uma subárvore (não ter filhos): esse é o caso mais fácil. Você pode simplesmente excluir o nó, sem precisar realizar outras ações.</li>
              <li>Uma subárvore (um filho): você precisa se certificar de que, após o nó ser excluído, seu filho é, então, conectado ao pai do nó excluído.</li>
              <li>Duas subárvores (dois filhos): você precisa encontrar e substituir o nó que você quer excluir pelo seu sucessor em ordem (o nó mais à esquerda na subárvore à direita).</li>
            </ol>
            <p>A complexidade de tempo para a criação de uma árvore é O(1). A complexidade de tempo para a pesquisa, inserção ou exclusão de um nó depende da altura h da árvore, portanto o pior caso é O(h) no caso de árvores que vão apenas em uma direção (esquerda ou direita).</p>
          </div>
        </section>
        <section className='classroom__content-section'>
          <h3>Implementação da BST</h3>
          <div className='classroom__content-section-item'>
            <p>Aqui temos uma definição para um nó da BST com alguns dados, referenciando seus nós filhos da esquerda e da direita.</p>
          </div>
        </section>
        <section className='classroom__content-section'>
          <h3>Operação de pesquisa</h3>
          <div className='classroom__content-section-item'>
            <p>Sempre que um elemento precisa ser pesquisado, comece a pesquisa a partir do nó raiz. Depois, se os dados forem menores do que o valor-chave, pesquise o elemento na subárvore da esquerda. Do contrário, pesquise o elemento na subárvore da direita. Siga o mesmo algoritmo para cada nó.</p>
          </div>
        </section>
        <section className='classroom__content-section'>
          <h3>Referências</h3>
          <div className='classroom__content-section-item'>
            <p>Ziviani, N. (2004). Projeto de algoritmos: com implementações em Pascal e C. PioneiraThomson Learning.</p>
            <p>Rojas-Salazar, A., Ramírez-Alfaro, P., and Haahr, M. (2020). Learning binary searchtrees through serious games. In First International Computer Programming EducationConference (ICPEC 2020). Schloss Dagstuhl-Leibniz-Zentrum für Informatik.</p>
            <p>Sra, P. and Chakraborty, P. (2018). Opinion of computer science instructors and stu-dents on moocs in an indian university. Journal of Educational Technology Systems,47(2):205–212.</p>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Subject;