# 0. Da Matemática para a Tomada de Decisão

Após a modelagem topológica, a detecção de comunidades e a auditoria de vieses descritas na etapa anterior, o projeto atingiu sua maturidade analítica. No entanto, matrizes e métricas matemáticas puras não são facilmente consumíveis institucionalmente. O desafio final foi produtizar esses achados, convertendo os grafos matemáticos em interfaces visuais interativas de apoio à tomada de decisão.

---

# 1. Pipeline de Visualização Interativa (Deploy Web)

A etapa de produtização dos dados topológicos foi implementada no notebook `4_Graph_Export_and_Visualization_Pipeline.ipynb`. Os grafos não ficaram restritos ao backend em Python; eles foram exportados e instanciados em uma aplicação web interativa desenvolvida com as bibliotecas JavaScript **`Sigma.js`** e **`Graphology`**.

Para garantir alto engajamento visual por parte dos gestores, os nós foram enriquecidos com metadados e propriedades visuais derivadas diretamente da matemática da rede:
* **Dimensionamento Topológico (Size):** O tamanho físico de cada nó na tela é renderizado dinamicamente de forma proporcional ao seu Grau (`size = 8 * sqrt(degree)`), evidenciando de imediato os maiores influenciadores e polos de pesquisa institucionais.
* **Mapeamento Categórico (Color):** As cores dos nós estão estritamente associadas à **área de atuação do pesquisador no câmpus**, facilitando a identificação visual de *clusters* departamentais através de uma legenda.
* **Humanização (Payload Visual):** Fotos dos pesquisadores foram coletadas manualmente em seus respectivos perfis Lattes e injetadas na renderização do front-end, transformando um grafo abstrato em um painel orgânico.

---

# 2. Ferramentas de Exploração Visual (UI/UX)

Para que a aplicação web atuasse como um verdadeiro produto de *Visual Analytics*, a interface foi equipada com um painel de controle flutuante, oferecendo aos gestores autonomia total na exploração dos dados:
* **Busca e Filtragem Granular:** O usuário pode isolar nós específicos pesquisando pelo nome do servidor ou aplicando filtros categóricos por Área de Atuação.
* **Isolamento de Vizinhança:** É possível aplicar um efeito que oculta o ruído visual da rede e destaca exclusivamente os próprios indivíduos que estão incluídos no filtro (desconsiderando suas conexões não incluídas no filtro).
* **Comutação Instantânea de Contexto:** Um botão de ação principal (Toggle) permite que o gestor alterne na mesma tela entre a visualização do Grafo Histórico (realidade atual) e do Grafo de Sugestões (predições do modelo), facilitando comparações diretas.
* **Gestão de Área de Trabalho Visual:** Controles para ocultar o painel de filtros e um botão de *Reset* para restaurar tais filtros.

---

# 3. Explainable AI (XAI) e Transparência de Modelo

A interface web foi desenhada sob os rigorosos princípios de Inteligência Artificial Explicável (*Explainable AI*). Através do script de parser no front-end (`publicationsParser.js`), foram implementados *tooltips* interativos e justificativas explícitas para cada conexão mapeada.

* **No Grafo de Sugestões (Preditivo):** Ao clicar em uma aresta sugerida pelo modelo, o sistema exibe não apenas as palavras-chave compartilhadas detectadas pelo algoritmo de NLP (também mostradas nas próprias arestas), mas lista exatamente os **títulos e anos das publicações** de cada autor que fundamentaram matematicamente aquela similaridade.
* **No Grafo Histórico (Real):** Ao clicar em uma aresta real, o sistema exibe a publicação exata que originou a colaboração acadêmica (título e ano). 

Esse nível de detalhamento garante a **explicabilidade total do modelo**, permitindo que a recomendação gerada pelo algoritmo seja auditável e perfeitamente compreensível pelo usuário final.

---

# 4. Tratamento de Exceções no Front-end (Fallback Handling)

Um desafio de integração arquitetural surgiu devido a uma assimetria nas bases exportadas. O arquivo de extração textual (`publicacoesPorMembro_.csv`) mapeia e isola estruturalmente apenas três tipos de produção: artigos em periódicos, trabalhos completos e resumos expandidos. Entretanto, a matriz de adjacência real considera conexões formadas por um escopo muito maior de categorias (livros, capítulos, produções técnicas, etc.).

Para contornar essa limitação sem gerar dados em branco ou falhas de execução no JavaScript, foi implementado um sistema de **fallback (*UI Graceful Degradation*) no front-end**. Quando um usuário clica em uma colaboração real originada por um tipo de publicação não mapeado pelo CSV, o sistema exibe um modal elegante informando que a conexão deriva de categorias bibliográficas estendidas. Essa solução de engenharia de software evita telas de erro e protege a integridade do sistema.

---

# 5. Business Intelligence e Dashboard Executivo

Para democratizar o acesso aos *insights* e permitir o consumo em formato de *Self-Service Analytics*, todo o repositório culminou no desenvolvimento de um Dashboard Executivo estruturado no **Google Looker Studio**. O painel foi organizado analiticamente em cinco páginas focadas em gestão estratégica:

* **Páginas 1 e 2 (Performance Institucional):** Visão quantitativa com séries temporais e gráficos de barras empilhadas focados no mapeamento da produção científica e no volume de orientações acadêmicas realizadas pelos servidores do câmpus.
* **Páginas 3 e 4 (Topologia Embarcada):** Atuam como um portal centralizado para a visualização espacial dos dados. Além do grafo histórico estático, a Página 4 eleva o nível técnico ao embutir nativamente a aplicação web interativa do grafo de sugestões. O gestor pode explorar as predições do algoritmo sem precisar sair do ambiente do Looker Studio.
* **Página 5 (Catálogo):** Uma visão tabular auditada que reflete os perfis de pesquisadores, garantindo transparência sobre a base nominal que compõe o painel.

> ⚠️ **Nota de Versionamento (IFrame Embedding):** A aplicação web embarcada ativamente na Página 4 do dashboard reflete uma *release* estável anterior do projeto (hospedada em um repositório legado). Por este motivo, podem ser observadas sutis diferenças estruturais ou visuais em relação à versão final e otimizada da topologia documentada neste repositório.

---

# 6. Experiência do Usuário (UX) e Acesso ao Produto

O design analítico do dashboard adotou fortemente o conceito de **Cross-Filtering** (filtros cruzados). A aplicação de um filtro em qualquer componente visual recalcula e atualiza dinamicamente toda a tela. Essa interatividade nativa possibilita análises rápidas de *drill-down* institucional.

🔗 **Acesso ao Produto de Dados em Produção**
O dashboard corporativo interativo encontra-se em produção, aberto ao público, e pode ser acessado, testado e validado através do link oficial abaixo:
**[Acessar Dashboard Executivo — Looker Studio](https://lookerstudio.google.com/s/q6lpVn7Dpow)**

---

*A entrega do dashboard interativo conclui a esteira técnica do projeto. No entanto, para garantir a total transparência analítica e governança dos dados, documentamos as restrições da base utilizada no capítulo final.*

➡️ **[Próximo Passo: Premissas de Negócio e Vieses da Base de Dados](5_limitations_and_bias.md)**