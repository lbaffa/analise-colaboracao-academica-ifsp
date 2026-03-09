# Premissas de Negócio e Vieses da Base de Dados

Neste projeto, o pipeline de dados assumiu algumas restrições estruturais importantes para garantir a viabilidade da modelagem.

---

## Sazonalidade e o "Buraco" de 2025

A etapa de extração automatizada (*web scraping*) foi executada no início do projeto, especificamente em **março de 2025**. Isso significa que a massa de dados referente a este ano reflete apenas o seu primeiro trimestre. 

Como consequência analítica direta, o dashboard e os modelos apresentam uma queda abrupta nas métricas de produção, uma redução no volume de colaborações registradas e uma rarefação visual de nós e arestas no grafo evolutivo final. **Por esta razão, o grafo estático gerado pelo *scriptLattes* para o ano de 2025 foi omitido da pasta de imagens do repositório (`assets/img/`), uma vez que a ausência de conexões até o mês da coleta resultaria em um arquivo visualmente em branco.** Esse comportamento não reflete necessariamente uma queda real de produtividade institucional, mas sim um artefato temporal isolado gerado pela janela de coleta.

---

## Viés de Permanência Institucional e Decisão Metodológica

A população da base de dados é composta estritamente pelos servidores que possuíram vínculo ativo com a instituição em algum momento entre 2016 e o instante da extração (março de 2025). Contudo, devido à ausência de bases de dados públicas sobre o histórico de lotação exato (como data de entrada, data de saída e tempo de permanência exclusiva no câmpus), o robô extrator capturou **toda a produção acadêmica desses indivíduos na janela de 2016 a 2025**, independentemente de terem prestado serviço na unidade durante a totalidade desse período. Na prática, um pesquisador que atuou por apenas alguns meses terá a sua produção prévia completa computada nas métricas globais.

Esse viés de atribuição não foi uma falha técnica, mas sim uma **decisão metodológica deliberada**. Essa premissa de negócio foi aceita no projeto por duas razões arquiteturais vitais:
1. Evitar a exclusão arbitrária de produções intelectuais válidas por falta de metadados exatos dos servidores.
2. Preservar a densidade matemática e a riqueza semântica das matrizes consumidas pelo modelo de processamento de texto (NLP), garantindo que o algoritmo de Sistema de Recomendação tivesse volume de dados suficiente para inferir similaridades precisas.