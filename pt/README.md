 # Covid-19 nos municípios do Brasil usando deck.gl

<a href="../README.md">README in english</a>

Uma visualização da evolução de casos de Covid-19 no Brasil usando deck.gl para o efeito 3D. Além disso, várias opções são apresentadas para customizar a apresentação.

 <a href="https://onilton.github.io/deck-covid19/pt/">Ir para visualização</a>


#### Por quê?

Existem muitos gráficos/mapas parecidos, poucos com uma visualização boa a nível de município.


Além disso, a elevação possível com o deck.gl ajuda a visualizar algumas
diferenças de forma mais clara, principalmente em municípios pequenos, mas com uma grande população.


Sempre tive um pouco dificuldade de ler os mapas que usam somente uma escala de cores.


Outra vantagem interessante é comparar duas métricas diferentes no mesmo gráfico, como por exemplo, mortes X casos.

#### Como

Utilizando <a href="https://deck.gl/#/">deck.gl</a> com os números fornecidos pelas secretarias de saúde dos estados,
dados tratados e disponibilizados por <a href="https://brasil.io/">Brasil.io</a>.

Malhas e outras informações disponibilizados pela <a href="https://servicodados.ibge.gov.br/">api do IBGE</a>.


#### Contribuições são bem-vindas!


#### Sobre mim

Siga-me no twitter <a href="http://twitter.com/oniltonmaciel">Onilton Maciel</a> :)

#### Outros

##### Porque não usar React, Vue.js, tecnologia XYZ ?

A idéia era fazer algo que fosse rápido, fácil de entender, rodar e customizar. Sem npm, build, e etc. Mas isso pode mudar no futuro.

##### Não funciona no meu navegador!

Infelizmente, já que evitei ferramentas de build, alguns navegadores mais antigos não são suportados. Atualize seu navegador. Se você achar que não é o caso, abra um issue que darei uma olhada.

##### Futuro?

Pensei em adicionar também alguma métrica contendo a previsão/projeção de crescimento para os próximos dias/meses. Falta achar e escolher um modelo de predição aberto e conhecido.