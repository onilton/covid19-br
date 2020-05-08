 # Covid-19 in cities of Brasil using deck.gl

A visualization of the evolution of cases of Covid-19 in Brazil using deck.gl for the 3D effect. There are also other options to customize the presentation.

#### Why?

There are many graphs/maps, but few have a good view at the city level.

Besides that, the elevation available through deck.gl helps to view some differences in a clear way, especially in small cities that have a high population density.

I always had trouble reading maps that only use a colorscale.

Another interesting feature is to compare two different metrics in the same graph, i.e deaths/cases.

#### How

Using <a href="https://deck.gl/#/">deck.gl</a> with the numbers provided by the health department of states. Data processed and made available by <a href="https://brasil.io/">Brasil.io</a>.

Geodata and other info are provided by <a href="https://servicodados.ibge.gov.br/">IBGE's api</a>.


#### Contributions are welcomed!


#### About me

Follow me on twitter <a href="http://twitter.com/oniltonmaciel">Onilton Maciel</a> :)

#### Others

##### Why you didn't use React, Vue.js, framework XYZ ?

The idea was to make something fast, easy to understand, run and customize. No npm, build, others. This mya change in the future.

##### It doesn't work in my browser!

Unfortunately, since I avoided build tools, some old browsers are not supported. Update your browser. If you think that is not the case, open an issue and I will look.

##### Future?

Maybe I can add some metric that predicts the evolution for the next days/months. I need to find and choose an open prediction model.