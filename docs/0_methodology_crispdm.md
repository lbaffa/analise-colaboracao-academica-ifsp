# 0. Metodologia Analítica (CRISP-DM Adaptado)

O projeto foi estruturado utilizando o framework **CRISP-DM (Cross-Industry Standard Process for Data Mining)**, amplamente adotado na indústria tecnológica para garantir organização metodológica e reprodutibilidade analítica. 

Contudo, para contemplar a natureza científica e acadêmica deste estudo, o ciclo original foi estendido e **adaptado**. Conforme descrito no capítulo de livro originado por esta pesquisa, foram adicionadas fases exclusivas de validação bibliográfica (*Revisão da Literatura*) e produtização acadêmica (*Benefícios, Relatórios e Encerramento*).

A aplicação deste framework híbrido envolveu as seguintes etapas cronológicas:

---

# 1. Entendimento do Negócio e do Problema (Business Understanding)

O objetivo central do projeto foi mapear, quantificar e prever os padrões de colaboração científica entre os servidores (docentes e técnicos administrativos) do IFSP — Câmpus Pirituba. Do ponto de vista institucional e estratégico, a análise buscou responder a questões fundamentais de gestão: qual é o nível de colaboração interna? Existem polos de pesquisa bem estabelecidos ou áreas isoladas? Quais são as oportunidades inexploradas? As metas foram definidas focando no entendimento da estrutura acadêmica e na escolha do ecossistema tecnológico apropriado para a análise.

---

# 2. Entendimento dos Dados e Revisão da Literatura

A fonte primária e oficial de dados foi a **Plataforma Lattes** (acesso público e construção colaborativa), compreendendo a janela de 2016 (ano de início do funcionamento do câmpus) a 2025. Inicialmente, realizou-se um mapeamento manual cruzado para identificar os IDs Lattes de docentes e técnicos administrativos do câmpus. 
Paralelamente, a fase de **Revisão da Literatura** atuou para identificar o "estado da arte" das soluções de Análise de Redes Sociais e colaboração científica, garantindo que o escopo tecnológico do projeto estivesse alinhado com as melhores práticas da fronteira do conhecimento.

---

# 3. Preparação dos Dados (Data Preparation)

A engenharia de dados exigiu o uso do extrator automatizado `scriptLattes` para gerar as matrizes relacionais limpas. Para habilitar a inteligência preditiva do projeto, os dados textuais (títulos das publicações) foram submetidos a um pipeline rigoroso de higienização via **Processamento de Linguagem Natural (NLP)**, englobando tokenização, remoção de *stopwords* e lematização, culminando na vetorização através do `CountVectorizer`.

---

# 4. Modelagem Estrutural e Semântica (Modeling)

A fase de modelagem operou em duas frentes de alta complexidade:
* **Motor Preditivo (Latente):** Construção de uma matriz matemática baseada em **Similaridade de Cosseno** para estimar o potencial de colaboração (afinidade de pesquisa) entre servidores que nunca trabalharam juntos.
* **Graph Analytics (Topologia):** A estrutura de colaboração foi modelada matematicamente como um **grafo** no `NetworkX`, extraindo métricas como Densidade, Assortatividade e Grau Médio. Para mapear o agrupamento orgânico do câmpus, aplicou-se o algoritmo de **Louvain**, identificando sub-redes com forte interação interna, independentemente do organograma oficial.

---

# 5. Avaliação e Validação Estatística (Evaluation)

O modelo de recomendação foi auditado estatisticamente. A similaridade de pares de pesquisadores com histórico real de colaboração (*Ground Truth*) foi comparada contra os pares sugeridos. Para medir a magnitude dessa diferença de forma imune a vieses volumétricos, aplicou-se o Tamanho de Efeito (**d de Cohen**), atestando matematicamente que o modelo captura com precisão os padrões reais de colaboração.

---

# 6. Benefícios, Deploy e Encerramento (Deployment & Reporting)

A consolidação do projeto ocorreu através da entrega de valor (*Benefícios*) em duas interfaces produtizadas:
* **Dashboard de Inteligência (Looker Studio):** Exploração interativa de KPIs institucionais (produtividade, evolução temporal e distribuição por áreas).
* **Aplicações Web de Topologia (Sigma.js):** Navegação espacial e interativa (*Explainable AI*) pelas redes de colaboração preexistentes e sugeridas.

A etapa de **Relatórios e Encerramento** reflete a consolidação formal da pesquisa, traduzida na publicação de relatórios técnicos, participação em congressos científicos, manuscritos submetidos e aprovação em capítulos de livro, atestando a qualidade do pipeline entregue.

---

*Com a estrutura metodológica híbrida definida e fundamentada na literatura, o projeto partiu para a execução técnica do pipeline de Engenharia de Dados.*

➡️ **[Próximo Passo: Arquitetura de Dados, MLOps e ETL](1_data_pipeline.md)**