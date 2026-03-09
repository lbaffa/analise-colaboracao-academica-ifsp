# ⚠️ Nota de Reprodutibilidade

Devido às recentes e rigorosas políticas de bloqueio antibot (**CAPTCHA**) implementadas pelo CNPq na Plataforma Lattes, a automação pública da etapa de coleta de dados pode não ser mais viável. 

Para preservar a reprodutibilidade científica do projeto, adotamos as seguintes medidas de governança:
- O **código original do extrator utilizado foi congelado** no repositório (`tools/scriptLattes/`).
- As **configurações originais (.config e .list)** foram preservadas.
- Os **dados brutos já extraídos foram arquivados** em `data/raw/`.

Assim, qualquer pesquisador ou avaliador poderá reproduzir **100% do pipeline analítico** a partir dos dados congelados.

---

# 💡 Nota sobre Integração com Business Intelligence

Para facilitar a integração direta com o **Google Looker Studio**, foram geradas duas versões da base de pesquisadores no diretório `data/processed/`:

### `lattes_definitivos.csv`
Base original preservando a granularidade completa das áreas de atuação extraídas do currículo Lattes. Essa estrutura é estritamente necessária para manter a integridade com as matrizes matemáticas geradas nos notebooks.

### `lattes_definitivos_looker.csv`
Versão transformada da base original com **redução de dimensionalidade categórica**, incluindo o agrupamento de categorias raras e a consolidação de perfis em grandes grupos (por exemplo: *Engenharia de Materiais*, *Engenharia de Alimentos* e *Biblioteconomia* foram condensadas na categoria *Técnico Administrativo*). 
Essa transformação de negócio teve como objetivo melhorar a **clareza visual do dashboard**, simplificar os **filtros interativos** e reduzir o ruído analítico nas visualizações executivas.

---

# 0. Da Metodologia para a Engenharia de Dados

Com o framework CRISP-DM adaptado e as diretrizes da pesquisa estabelecidas na etapa anterior, o projeto avançou para a execução do seu alicerce técnico. O pipeline analítico foi estruturado em etapas sequenciais para garantir que os dados brutos e semiestruturados da web fossem convertidos em matrizes relacionais higienizadas, prontas para o consumo de algoritmos de Machine Learning.

---

# 1. Extração de Dados e Resiliência de Software (MLOps)

A coleta inicial dos currículos foi realizada utilizando a ferramenta open-source **scriptLattes**. A extração operou em dois formatos:
* **Rodadas Anuais:** Execuções individuais parametrizadas para gerar as métricas que abastecem o Looker Studio e as matrizes isoladas que alimentam as séries temporais.
* **Rodada Consolidada:** Execução unificada (2016 a 2025) que gera a matriz de adjacência global.

**Estratégia de Software Freezing:** Durante o desenvolvimento, o repositório original do *scriptLattes* sofreu atualizações severas que alteraram o esquema de dados de saída, quebrando os pipelines de ETL deste projeto. Para garantir a resiliência (prática comum de **MLOps**), a versão exata e funcional da ferramenta foi isolada fisicamente no repositório. Isso blinda o projeto contra dependências externas e garante reprodutibilidade.

---

# 2. ETL e Construção de Métricas Históricas

Após a coleta bruta, os dados passaram por um pipeline de **Extração, Transformação e Carga (ETL)**. Os dados foram processados para extrair métricas institucionais — como publicações científicas e orientações acadêmicas e colaborações entre pesquisadores — cobrindo o período de **2016 a 2025**. As tabelas resultantes foram higienizadas e estruturadas em formatos colunares para consumo direto em dashboards e análises estatísticas.

---

# 3. Data Sourcing e Modelagem da Tabela Fato

Como não existe uma base pública centralizada contendo o perfil acadêmico de todos os servidores do câmpus, desenvolvemos uma estratégia de **mapeamento manual cruzado** (portais do IFSP, planos de curso e sistemas administrativos) para levantar a lista nominal completa de docentes e técnicos.

Essas informações foram consolidadas na base dimensional principal (`lattes_definitive.csv`). Nesta modelagem, definimos três atributos estruturais:
* **ID Lattes (16 dígitos):** Utilizado como **Chave Primária (Primary Key)**, permitindo o relacionamento unívoco com os currículos na web.
* **Nome do Servidor:** Identificação nominal em texto plano.
* **Área de Atuação:** Utilizada como **Label Categórica**, posteriormente aplicada na clusterização visual dos grafos (cores dos nós) e filtros do BI.

---

# 4. Curadoria de Artefatos e Padronização de Dados

O extrator atua originalmente como um gerador de sites estáticos, produzindo um volume massivo de arquivos. Para adequar o output aos padrões de **Ciência de Dados**, preservamos apenas artefatos com valor analítico:
* **Métricas Anuais:** HTMLs processados para extração de séries temporais.
* **Corpus Textual:** O arquivo `relacao_bruta_publicacoes.csv`, consumido pelo pipeline de NLP.
* **Matrizes de Adjacência, Lista dos Servidores e Grafos Estáticos:** O *baseline* das conexões reais.

Para garantir a **Governança de Dados**, todos os arquivos úteis foram renomeados seguindo o padrão da indústria **`snake_case`** (ex: `0_adj_consolidated_2016_2025.txt`). Isso assegura a leitura programática consistente via Python e a ingestão limpa via Pandas.

---

# 5. O Desafio da Reconstrução das Matrizes (Index Mapping)

Um dos maiores desafios técnicos da modelagem topológica foi a matriz de adjacência legada (`0_adj_consolidated_2016-2025.txt`), que continha puramente valores escalares binários (`0` ou `1`), sem **metadados em suas linhas ou colunas** (sem cabeçalhos).

Para reconstruir a matriz relacional de forma determinística, injetamos um metadado auxiliar: a `researchers_names.txt`. Como este arquivo preserva a exata ordem de processamento do *web scraping*, ele atuou como vetor de mapeamento (*Index Mapping*) para rotular perfeitamente os eixos X e Y. Essa engenharia de *features* foi fundamental para destravar a análise estatística e o uso da biblioteca topológica **`NetworkX`**.

---

# 6. Automação de ETL para Métricas Institucionais

Para escalar a consolidação das métricas anuais — que exigia intervenções manuais em planilhas —, desenvolveu-se o notebook `0_Dashboard_Metrics_ETL.ipynb`.

## Shadow Pipeline e Staging Area (Looker Studio)
O script opera o fluxo completo: extrai os dados dos HTMLs originais, aplica transformações (incluindo empilhamento temporal) e faz o *Load* exportando o artefato `metrics_looker_studio.csv`.

No ambiente de produção real, esses arquivos CSV atuam como uma **Staging Area** (área de transição). Eles são ingeridos nativamente pelo ecossistema do Google Workspace (sendo convertidos para Google Planilhas, sob a nomenclatura legada) para então alimentar o Looker Studio. 

Como o dashboard original do Câmpus consumia essas fontes legadas, o fluxo Python atuou como um **Shadow Pipeline** (processamento paralelo invisível), provando que é possível modernizar a esteira de dados de uma instituição sem causar impacto, quebras de link ou indisponibilidade na interface final.

---

*A etapa de preparação de dados formou o alicerce da pesquisa. Com o Data Pipeline construído e as matrizes relacionais consolidadas, o projeto avança para a descoberta de colaborações latentes através da extração de features semânticas.*

➡️ **[Próximo Passo: Modelagem NLP e Validação Estatística](2_nlp_model.md)**