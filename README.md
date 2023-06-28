# O Monitor

No âmbito da Ciência da Computação, percebe-se ainda uma dificuldade latente de estudantes dos primeiros períodos quanto a aprendizagem de algoritmos e estruturas de dados. Destinadas ao ciclo básico de computação, plataformas como DS-Hacker e Blocks4DS apresentam ferramentas que auxiliam o ensino de Árvores Binárias de Busca (ABBs). Porém não são observadas plataformas que agreguem em sua estrutura, além do conteúdo textual e avaliações por questionário e práticas, visualização dinâmica dos algoritmos executados. Tendo isso em vista, neste trabalho foi desenvolvida uma plataforma web, chamada Monitor, que auxilia o ensino de ABBs e apresenta estas funcionalidades, estruturada com base na Taxonomia de Bloom para o aprendizado. O software desenvolvido foi avaliado por meio de feedbacks e interações com a plataforma de 12 alunos de Ciência da Computação da PUC Minas que se voluntariaram para testá-lo. Foram obtidos feedbacks positivos dos usuários e apontadas melhorias, sendo a plataforma validada como uma ferramenta auxiliar ao ensino de ABBs.

## Execução

No diretório do projeto, execute:

### `npm i`

Para instalar as dependências necessárias. Em seguida, será necessário criar um arquivo .env com a definição das variáveis de ambiente utilizadas pela aplicação. Você precisará de chaves de acesso para as APIs da [Strapi](https://docs.strapi.io/dev-docs/intro), [GitHub](https://docs.github.com/pt/rest?apiVersion=2022-11-28) e [CodeX](https://rapidapi.com/jaagravseal03/api/codex7/) para executar este projeto corretamente. As variáveis de ambiente devem ser definidas como abaixo:

### `CX_ENDPOINT`

O _endpoint_ para a API do CodeX.

### `CX_HOST`

O _host_ para o CodeX.

### `CX_TOKEN`

Obtido a partir do cadastro na ferramenta.

### `GH_ENDPOINT`

O _endpoint_ para a API do GitHub.

### `GH_OWNER`

Nome do usuário proprietário do repositório qeu se deseja manipular.

### `GH_REPO`

Nome do repositório qeu se deseja manipular.

### `GH_TOKEN`

Chave privada definida na plataforma.

### `GH_VERSION`

Versão da API do GitHub utilizada.

### `SESSION_SECRET`

Chave aleatória gerada para armazenamento de sessão via _express-session_.

### `SESSION_MAX_AGE`

Tempo até sessão ser expirada.

### `NODE_ENV`

Ambiente de execução, tradicionalmente _development_.

O repositório Strapi com o modelo de dados necessário para a aplicação pode ser encontrado [aqui](https://github.com/nasciontem/oh-monitor-strapi) e informa o preenchimento das demais variáveis associadas ao Strapi.

Em seguida, execute:

### `npm run server`

Para iniciar o servidor localmente na porta 3000. Depois de iniciado, execute:

### `npm start`

Para iniciar o aplicativo localmente.\
Abra [http://localhost:3001](http://localhost:3001) para visualizá-lo em seu navegador.

Caso deseje operar em ambiente _production_, execute o comando `npm run build`, para gerar uma versão mais atual da pasta _build_, em seguida `npm run server`, para inicial o servidor na porta 3000, e acesse a porta [3000](http://localhost:3000) no navegador.

Para acessar os códigos apresentados pela plataforma, realize um _fork_ do repositório [oh-monitor-codes](https://github.com/nasciontem/oh-monitor-codes).
