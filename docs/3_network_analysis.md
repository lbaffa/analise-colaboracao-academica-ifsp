# 0. Do Espaço Vetorial para a Topologia de Redes

Após a vetorização do *corpus* textual e a validação estatística do modelo de NLP descritas na etapa anterior, o pipeline avançou da análise semântica para a representação espacial dessas conexões. 

A modelagem topológica e a extração de métricas estruturais foram consolidadas no notebook `3_Network_Analysis_and_Historical_Metrics.ipynb`, utilizando a biblioteca de teoria dos grafos **`NetworkX`**. 

# 1. Graph Analytics e Análise de Redes Complexas

O estudo baseou-se na construção e comparação de duas estruturas de rede distintas:
* **Rede Histórica (`G_preexisting`):** Mapeia estritamente as colaborações e coautorias reais já consolidadas na instituição.
* **Rede Preditiva (`G_suggestions`):** Projeta o ambiente futuro, representando as colaborações sugeridas matematicamente pelo modelo de inferência NLP aliado ao cálculo de Similaridade por Cosseno.

Para compreender a fundo a **estrutura hierárquica da rede de pesquisa**, o pipeline calculou não apenas métricas clássicas (número de nós, número de arestas, grau médio e densidade da rede), mas também extraiu métricas topológicas avançadas, como a **Assortatividade de Grau** e a **Conectividade Média de Grau**, que revelam como os grandes influenciadores (*hubs*) se conectam com a periferia da rede.

---

# 2. Detecção de Comunidades (Agrupamentos Orgânicos)

Para ir além das métricas globais e identificar agrupamentos naturais de colaboração (que muitas vezes transcendem o organograma formal e rígido da instituição), aplicamos o algoritmo de **Louvain Community Detection**. Este algoritmo foi responsável por rastrear a topologia e identificar *clusters* orgânicos de pesquisadores caracterizados por uma forte densidade de interação interna.

Visando a operacionalização desses *insights*, a rede não foi entregue apenas como um bloco monolítico. Cada comunidade detectada foi particionada e exportada em arquivos granulares independentes (ex: `pre_existing_community_1.csv`, `pre_existing_community_2.csv`, etc.). Essa granularidade de exportação permite a realização de análises altamente direcionadas e o desenvolvimento de políticas institucionais específicas para estimular microrredes isoladas.

---

# 3. Avaliação de Viés do Modelo (Bias Assessment)

Durante a validação arquitetural do sistema de recomendação, levantou-se uma questão central de governança algorítmica: **o modelo preditivo favorece certos grupos, gerando distorções na representatividade institucional da rede sugerida?**

Para auditar a segurança do algoritmo contra vieses de recomendação, comparamos a proporção de indivíduos no Grafo Histórico (*Ground Truth*) contra a do Grafo de Sugestões. Aplicamos a métrica **RMSE (Root Mean Square Error)** para medir a magnitude do erro percentual entre essas duas distribuições.

Os testes estatísticos focaram em dois eixos de representatividade:
* **Área de Atuação:** A variância da representatividade das áreas entre as duas redes apresentou um erro muito baixo, registrando um RMSE de apenas **10%**.
* **Titulação Acadêmica:** A distribuição de graus acadêmicos (Doutorado, Mestrado, Especialização, etc.) não apresentou diferenças estruturais importantes, registrando um RMSE ainda menor, de **6%**.

Esses baixos erros distributivos atestam matematicamente a neutralidade do sistema. O modelo comprovou ser seguro e equilibrado, evidenciando que ele preserva a diversidade acadêmica da instituição e não vicia a arquitetura da rede (garantindo, por exemplo, que o algoritmo não concentre recomendações exclusivamente em perfis com Doutorado ou restrinja colaborações a uma única área predominante), seguindo uma tendência similar aos padrões preexistentes.

---

*Com as redes modeladas, as comunidades detectadas e os vieses auditados, os grafos matemáticos precisavam ser convertidos em interfaces visuais consumíveis institucionalmente.*

➡️ **[Próximo Passo: Deploy Web, Explainable AI e Dashboard Interativo](4_visualization_and_bi.md)**