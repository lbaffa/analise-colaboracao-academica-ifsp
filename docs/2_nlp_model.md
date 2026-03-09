# 0. Da Engenharia de Dados para a Inteligência Semântica

Com o Data Pipeline consolidado, as métricas históricas estruturadas e o problema do *Index Mapping* resolvido na etapa anterior, o projeto construiu a base necessária para avançar da estatística descritiva para a inteligência preditiva. O foco desta etapa foi processar o vasto volume de texto das publicações para descobrir padrões de pesquisa ocultos.

---

# 1. Feature Engineering e Construção do Corpus para NLP

A base de publicações extraída pelo sistema legado (`raw_publications.csv`) apresentou um problema comum em projetos de dados: a **falta de integridade estrutural**. O arquivo original operava em um formato semiestruturado, sem indexação clara ou metadados consistentes, no qual a ausência de um campo opcional (como DOI) provocava o deslocamento em cascata de todas as colunas subsequentes (*data shift*). 

Criar um *parser* computacional robusto via **Regex em Python** para tratar um arquivo sem padrão consistente representaria um custo técnico desproporcional. Adotando uma postura pragmática orientada a resultados (custo-benefício), foi realizada uma etapa supervisionada de *data cleansing* manual assistido por planilhas. O artefato limpo e consolidado (`processed_publications.csv`) reduziu a base a apenas duas dimensões essenciais: o **Pesquisador** (identificação nominal) e o **Título** (uma única *string* contendo a concatenação de todos os títulos de publicações do indivíduo de 2016 a 2025). 

Com essa transformação estrutural, cada pesquisador passou a ser representado por **um único documento textual agregado**. Essa modelagem permite que o algoritmo trate a produção científica completa como um *corpus* textual unificado, viabilizando a extração de *features* semânticas.

---

# 2. Processamento de Linguagem Natural (NLP)

O núcleo preditivo do projeto, implementado no notebook `1_NLP_Feature_Extraction_and_Similarity.ipynb`, foi desenvolvido para transcender a simples análise de colaborações explícitas e descobrir **colaborações latentes** (ou seja: identificar quem pesquisa sobre os mesmos temas, mas nunca publicou em coautoria).

Para preparar os dados, aplicamos um rigoroso pipeline de pré-processamento textual utilizando a biblioteca **NLTK**:
* **Normalização:** Conversão de todo o texto para letras minúsculas e remoção sistemática de pontuações, números e caracteres especiais.
* **Tokenização e Stopwords:** Separação do texto em unidades léxicas (*tokens*) e remoção de palavras de baixo valor semântico (aplicando filtros para múltiplos idiomas, respeitando o caráter internacional das publicações científicas).
* **Lematização e Stemming:** Redução de palavras aos seus radicais morfológicos (exemplo: *educação*, *educacional* e *educador* são convertidos para o radical `educ`). Essa decisão arquitetural aumenta drasticamente a densidade informacional do modelo ao unificar variações de um mesmo conceito.

---

# 3. Vetorização do Corpus e Motor de Similaridade

Após o pré-processamento, o *corpus* foi transformado em vetores numéricos através do `CountVectorizer` da biblioteca **scikit-learn** (estratégia *Bag of Words*). Cada pesquisador passou a ser representado como um vetor em um espaço n-dimensional, onde cada dimensão contabiliza a frequência de um termo específico, gerando a chamada **Term Document Matrix**.

Com o espaço vetorial mapeado, a similaridade temática entre os servidores foi calculada através da **Cosine Similarity** (Similaridade de Cosseno). A escolha desta métrica é estratégica: ela mede o ângulo entre os vetores em vez da sua magnitude, tornando o modelo extremamente robusto contra diferenças de escala. Na prática, isso garante um nivelamento institucional justo: um pesquisador sênior com 50 artigos e um pesquisador júnior com 5 artigos terão alta similaridade matemática se compartilharem o mesmo foco temático.

---

# 4. Otimização de Armazenamento e Engenharia de Dados

Como as matrizes geradas pelo pipeline NLP são extremamente densas e volumetricamente grandes, otimizar a infraestrutura tornou-se essencial. Os artefatos matriciais finais foram exportados no formato **`.parquet`**. 

Essa decisão técnica proporciona armazenamento colunar e compressão eficiente, reduzindo significativamente o peso do repositório e acelerando exponencialmente o tempo de leitura (I/O) nos notebooks subsequentes. Paralelamente, rotinas de auditoria foram mantidas no código para exportar os mesmos artefatos em formato **`.csv`**, garantindo acessibilidade para validações humanas e cruzamento em planilhas.

---

# 5. Validação Estatística do Modelo Algorítmico

A geração de uma matriz de similaridade semântica levanta uma questão central de governança analítica: **o modelo realmente captura relações reais ou apenas aproxima palavras aleatoriamente?** Para responder a esta pergunta e auditar a precisão do algoritmo, desenvolveu-se o notebook `2_Statistical_Validation_and_Model_Assessment.ipynb`.

A matriz de colaborações reais existentes foi definida como **Verdade Absoluta (Ground Truth)**. Realizamos testes estatísticos rigorosos para verificar se o modelo conseguia separar as distribuições numéricas de dois grupos: a similaridade entre pesquisadores que *já colaboraram* entre si versus a similaridade entre os que *nunca colaboraram* entre si. 

Como o alto volume de dados em bases extensas pode gerar *p-values* artificiais que indicam significância estatística mesmo para efeitos irrelevantes, a validação adotou a métrica **Tamanho de Efeito (d de Cohen / Cohen's d)**. Essa métrica comprova o tamanho real da diferença entre os grupos. 

Os resultados da validação atestaram que o modelo baseado em **unigramas** apresentou o melhor desempenho estatístico do projeto. Para a classificação do Sistema de Recomendação, o *threshold* (limite de corte preditivo para sugerir potenciais colaborações futuras) não foi baseado em suposições, mas fixado matematicamente na **mediana da distribuição de similaridade**, atingindo o valor exato de **`0.2264`**.

*Com as features semânticas extraídas e o modelo de recomendação matematicamente validado, o projeto avança para a modelagem espacial dessas conexões e o cálculo de influências.*

➡️ **[Próximo Passo: Graph Analytics e Análise de Redes Complexas](3_network_analysis.md)**