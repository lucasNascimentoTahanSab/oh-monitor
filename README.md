# O Monitor

No âmbito da Ciência da Computação, percebe-se ainda uma dificuldade latente de estudantes dos primeiros períodos quanto a aprendizagem de algoritmos e estruturas de dados. Destinadas ao ciclo básico de computação, plataformas como DS-Hacker e Blocks4DS apresentam ferramentas que auxiliam o ensino de Árvores Binárias de Busca (ABBs). Porém não são observadas plataformas que agreguem em sua estrutura, além do conteúdo textual e avaliações por questionário e práticas, visualização dinâmica dos algoritmos executados. Tendo isso em vista, neste trabalho foi desenvolvida uma plataforma web, chamada Monitor, que auxilia o ensino de ABBs e apresenta estas funcionalidades, estruturada com base na Taxonomia de Bloom para o aprendizado. O software desenvolvido foi avaliado por meio de feedbacks e interações com a plataforma de 12 alunos de Ciência da Computação da PUC Minas que se voluntariaram para testá-lo. Foram obtidos feedbacks positivos dos usuários e apontadas melhorias, sendo a plataforma validada como uma ferramenta auxiliar ao ensino de ABBs.

## Execução

No diretório do projeto, execute:

### `npm i`

Para instalar as dependências necessárias. Em seguida, será necessário criar um arquivo .env com a definição das variáveis de ambiente utilizadas pela aplicação. Você precisará de chaves de acesso para as APIs da Strapi, GitHub e CodeX para executar este projeto corretamente. O repositório Strapi com o modelo de dados necessário para a aplicação pode ser encontrado [https://github.com/nasciontem/oh-monitor-strapi](aqui).

Em seguida, execute:

### `npm run server`

Para iniciar o servidor localmente na porta 3000. Depois de iniciado, execute:

### `npm start`

Para iniciar o aplicativo localmente.\
Abra [http://localhost:3001](http://localhost:3001) para visualizá-lo em seu navegador.
