const OPTIONS = ['darkMode', 'removeZeroes', 'barMetric', 'colorMetric', 'days', 'elevationMultiplier', 'opacity'];

var stateIdByUF = { "RO": 11, "AC": 12, "AM": 13, "RR": 14, "PA": 15, "AP": 16, "TO": 17, "MA": 21, "PI": 22, "CE": 23, "RN": 24, "PB": 25, "PE": 26, "AL": 27, "SE": 28, "BA": 29, "MG": 31, "ES": 32, "RJ": 33, "SP": 35, "PR": 41, "SC": 42, "RS": 43, "MS": 50, "MT": 51, "GO": 52, "DF": 53 }

var UFsbyRegionSigla = {
    "N": ["RO", "AC", "AM", "RR", "PA", "AP", "TO"],
    "NE": ["MA", "PI", "CE", "RN", "PB", "PE", "AL", "SE", "BA"],
    "SE": ["MG", "ES", "RJ", "SP"],
    "S": ["PR", "SC", "RS"],
    "CO": ["MS", "MT", "GO", "DF"]
};

var regionIdBySigla = {
    "N": 1,
    "NE": 2,
    "SE": 3,
    "S": 4,
    "CO": 5
};

function hexToRgb(hex) {
    let bigint = parseInt(hex.replace("#", ''), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return [r, g, b];
}

const INFERNO_COLOR_SCALE =
    ["#000004", "#060416", "#0d0721", "#110b2c", "#140d37", "#1b0c41", "#230d4a", "#2c0e52", "#350e5b", "#3f0e63", "#4a0c6b", "#540e6b", "#5e116c", "#67146c", "#70186d", "#781c6d", "#821d6b", "#8c1f68", "#952366", "#9d2763", "#a52c60", "#af2e5c", "#b93257", "#c13752", "#c93d4c", "#cf4446", "#d74a41", "#dd513c", "#e35835", "#e9602e", "#ed6925", "#f17321", "#f47d1c", "#f78716", "#f9910f", "#fb9b06", "#fba611", "#fab11c", "#f9bc27", "#f8c732", "#f7d13d", "#f7db53", "#f7e468", "#f8ee7c", "#faf690", "#fcffa4"].map(hexToRgb)

const YlOrRdLog50_25 = ["#ffffcc", "#fee792", "#fecc67", "#febf59", "#fea645", "#fe9a40", "#fd8d3c", "#fd7b33", "#fd662d", "#fd662d", "#fc4e2a", "#fc4e2a", "#f44025", "#f44025", "#eb3020", "#eb3020", "#e31a1c", "#e31a1c", "#e31a1c", "#d71121", "#d71121", "#d71121", "#ca0724", "#ca0724", "#ca0724", "#ca0724", "#bd0026", "#bd0026", "#bd0026", "#bd0026", "#bd0026", "#a90027", "#a90027", "#a90027", "#a90027", "#a90027", "#940027", "#940027", "#940027", "#940027", "#940027", "#940027", "#800026", "#800026", "#800026", "#800026", "#800026", "#800026", "#800026", "#800026"].map(hexToRgb);

// Make first color white
YlOrRdLog50_25[0] = hexToRgb("#ffffff");



const COLOR_SCALE2 = [
    // negative
    // [65, 182, 196],
    // [127, 205, 187],
    // [199, 233, 180],
    [237, 248, 177],

    // positive
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [189, 0, 38],
    [128, 0, 38]
];

const Reds = ["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"].map(hexToRgb);
// Reds[0] = Reds[0].concat([100])

const PuRd = ["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"].map(hexToRgb);
PuRd[0] =  PuRd[0].concat([50])

const YlOrRd = [
    [128,0,38],
    [189,0,38],
    [227,26,28],
    [252,78,42],
    [253,141,60],
    [254,178,76],
    [254,217,118],
    [255,237,160],
    [255,255,204]
].reverse();

// const RdOpacity = [
//     [128,0,38, 255],
//     [128,0,38, 224],
//     [128,0,38, 192],
//     [128,0,38, 160],
//     [128,0,38, 128],
//     [128,0,38, 96],
//     [128,0,38, 64],
//     [128,0,38, 32],
//     [128,0,38, 0]
// ].reverse();

const COLOR_SCALE = PuRd


console.log(COLOR_SCALE);

function pandemicStart() {
    return new Date(2020, 02 - 1, 26);
}

function daysFromPandemicStart() {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    return Math.floor((Date.now() - pandemicStart()) / _MS_PER_DAY);

}

function loadCSV(file) {
    return new Promise(function (resolve, reject) {
        d3.csv(file, function(error, request) {
            if(error) {
               reject(error);
            } else {
               resolve(request);
            }
         });
     });
 }

 let csvCovidDataPromise = null

 // Get covid data
async function fetchCovidCsvData() {
    if (csvCovidDataPromise == null) {
        csvCovidDataPromise = loadCSV("https://raw.githubusercontent.com/onilton/covid19-br/master/caso_full.csv").then(csvCovidData =>
            _.groupBy(csvCovidData, i => i.date)
        )
    }

    return await csvCovidDataPromise;
}

// Get covid data
async function fetchCovidResults(stateUF, date) {
    const baseData = await fetchCovidCsvData();
    const stateData = baseData[date].filter(i => i.state == stateUF)
    console.log(stateUF)
    console.log(stateData)
    return stateData;
}

// Get covid data
async function oldFetchCovidResults(stateUF, date) {
    // console.log("start fetch c")
    let url = "https://brasil.io/api/dataset/covid19/caso/data?state=" + stateUF
    if (date) {
        url += "&date=" + date;
    } else {
        url += "&is_last=True";
    }

    const rsp = await fetch(url)
    // console.log("end fetch c")
    const json = await rsp.json();
    return json.results;
    //return data.value.joke;
}

const covidCitiesCache = {}

async function fetchCovidCities(stateUFs, dateStr) {
    if (stateUFs in covidCitiesCache && dateStr in covidCitiesCache[stateUFs]) {
        return covidCitiesCache[stateUFs][dateStr];
    }
    let allCovidResults = await Promise.all(stateUFs.map(stateUF => fetchCovidResults(stateUF, dateStr)));
    let covidResults = _.flatten(allCovidResults, true)
    // console.log(covidResults)
    var covidCities = covidResults.filter(city => city.city != null)
    const groupedCovidCities = _.groupBy(covidCities, city => city.city_ibge_code)
    if (!(stateUFs in covidCitiesCache)) {
        covidCitiesCache[stateUFs] = {}
    }

    covidCitiesCache[stateUFs][dateStr] = groupedCovidCities;

    return groupedCovidCities;
}


// Fetch a random joke
async function fetchLocationGeoData(malhaId) {
    console.log("start fetch")
    const rsp = await fetch(`https://servicodados.ibge.gov.br/api/v2/malhas/${malhaId}?resolucao=5&formato=application/vnd.geo+json`)
    console.log("end fetch")
    return await rsp.json();
    //return data.value.joke;
}

// Fetch a random joke
async function fetchLocationInfo(stateId) {
    console.log("start fetch")
    const rsp = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/distritos`)
    console.log("end fetch")
    return await rsp.json();
    //return data.value.joke;
}

function getGroupedAllCities(locationInfo, cityName) {
    const locationInfo2 = locationInfo.map(location => {
        return {
            "city": location.municipio.nome,
            "city_ibge_code": location.municipio.id,
            "confirmed": 0,
            "deaths": 0,
            "confirmed_per_100k_inhabitants": 0,
            "state": location.municipio.microrregiao.mesorregiao.UF.sigla
        }
    });

    console.log(locationInfo2)
    const groupedLocationInfo = _.groupBy(locationInfo2, loc => loc.city_ibge_code)

    return groupedLocationInfo;
}

function debounced(delay, fn) {
    let timerId;
    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    }
}

var groupedAllCities = {}

var maxMetricValue = undefined;

async function doIt() {
    // confirmed | deaths | confirmed_per_100k_inhabitants
    const metrics = {
        confirmed: { name: "last_available_confirmed", label: "Casos confirmados", elevationMultiplier: 500 },
        deaths: { name: "last_available_deaths", label: "Mortes", elevationMultiplier: 1000 },
        confirmed_per_100k_inhabitants: { name: "last_available_confirmed_per_100k_inhabitants", label: "Conf. proporcional", elevationMultiplier: 3000 }
    }
    // elevation multiplier

    let metric = metrics.confirmed
    let colorMetric = metrics.confirmed
    const elevationMultiplier = 500
    const removeZeroes = true

    // let stateUFs = ["AM", "PA"]
    // let stateUFs = ["RO","AC","AM","RR","PA","AP","TO"]
    let stateUFs =
        UFsbyRegionSigla["N"].concat(UFsbyRegionSigla["NE"]).concat(UFsbyRegionSigla["SE"]).concat(UFsbyRegionSigla["S"]).concat(UFsbyRegionSigla["CO"])
    let stateIds = stateUFs.map(stateUF => stateIdByUF[stateUF])
    // let malhaId = regionIdBySigla["N"];
    let malhaId = "";
    console.log(stateUFs)


    let locationGeoData = await fetchLocationGeoData(malhaId);
    const allLocationInfo = await Promise.all(stateIds.map(stateId => fetchLocationInfo(stateId)));
    let locationInfo = _.flatten(allLocationInfo, true);
    let originalGroupedAllCities = getGroupedAllCities(locationInfo);
    let groupedAllCities = JSON.parse(JSON.stringify(originalGroupedAllCities));




    const deckgl = new deck.DeckGL({
        mapboxApiAccessToken: 'pk.eyJ1Ijoib25pbHRvbiIsImEiOiJjazk5ZjZ0bjQwdXpqM2txeGFlMmQzMjZuIn0.vvNzNb-52JjOo59Eqmq7Tg',
        mapStyle: 'mapbox://styles/mapbox/light-v9',
        // mapStyle: 'mapbox://styles/mapbox/dark-v9',
        initialViewState: {
            // latitude: 49.254,
            // longitude: -123.13,
            // zoom: 11,
            //   maxZoom: 16,
            latitude: -15.254,
            longitude: -51.13,
            zoom: 4,
            maxZoom: 9,
            pitch: 45
        },
        controller: true,
        //layers: [geojsonLayer],
        getTooltip
    });

    document.getElementById('days').max = daysFromPandemicStart();

    document.getElementById('days').value = daysFromPandemicStart() - 1;
    document.getElementById('next-day').onclick = (ev) => {
        document.getElementById('days').value = parseInt(document.getElementById('days').value) + 1;
        document.getElementById('days').oninput();
    }

    document.getElementById('previous-day').onclick = (ev) => {
        document.getElementById('days').value = parseInt(document.getElementById('days').value) - 1;
        document.getElementById('days').oninput();
    }


    OPTIONS.forEach(key => {
        document.getElementById(key).oninput = debounced(300, renderLayer);
        if (document.getElementById(key).type == undefined) {
            document.getElementsByName(key).forEach(el => {
                el.oninput = debounced(300, renderLayer)
            })
        }
        //document.getElementByName(key).oninput = renderLayer;
    });

    function getHashQueryString() {
        return new URLSearchParams(window.location.hash.substr(1))
    }

    let defaultValuesForOptions;
    function setHashQueryString(key, value) {
        const params = new URLSearchParams(window.location.hash.substr(1));
        if (value == defaultValuesForOptions[key]) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        window.location.hash = '#' + params.toString();
    }

    window.addEventListener("hashchange", () => {
        setOptionsInForm(Object.assign({},defaultValuesForOptions, getOptionsFromHash()));
    }, false);

    function getOptionsFromHash() {
        return Object.fromEntries(getHashQueryString());
    }

    function getOptionsFromForm() {
        const options = {};

        OPTIONS.forEach(key => {
            const form = document.getElementById('control-form')
            const element = form.elements[key]

            let value;
            if (element.type == 'checkbox') {
                value = element.checked;
            } else {
                value = element.value;
            }

            const screenValue = document.getElementById(key + '-value')
            if (screenValue) {
                screenValue.innerHTML = value;
            }

            options[key] = value;
        });

        return options;
    }

    function setOptionsInForm(options) {
        Object.entries(options).forEach(([key, value]) => {

            const form = document.getElementById('control-form')
            const element = form.elements[key]

            if (element && element.type == 'checkbox') {
                element.checked = value;
            } else if (element) {
                element.value = value;
            }

            const screenValue = document.getElementById(key + '-value')
            if (screenValue) {
                screenValue.innerHTML = value;
            }
        });

        return options;
    }

    defaultValuesForOptions = getOptionsFromForm();

    setOptionsInForm(getOptionsFromHash())

    await renderLayer();

    async function renderLayer() {
        console.log("WILL RENDER LAYER")

        const options = getOptionsFromForm();
        Object.entries(options).forEach(([key, value]) => {
            setHashQueryString(key, value);
        });

        console.log(options)

        const date = new Date(2020, 02 - 1, 26);
        date.setDate(date.getDate() + parseInt(options.days));
        const dateStr = date.toISOString().slice(0, 10);

        document.getElementById("current-day").value = dateStr
        console.log(options.days)
        console.log(dateStr)

        var groupedCovidCities = await fetchCovidCities(stateUFs, dateStr)


        groupedAllCities = JSON.parse(JSON.stringify(originalGroupedAllCities));

        Object.keys(originalGroupedAllCities).map(function (key, index) {
            if (key in groupedCovidCities) {
                groupedAllCities[key] = groupedCovidCities[key];
            }
        });

        const mapStyleVersion = options.darkMode ? 'dark' : 'light';
        const mapStyle = `mapbox://styles/mapbox/${mapStyleVersion}-v9`;

        if (options.darkMode) {
            document.body.className="bootstrap-dark";
        } else {
            document.body.className="bootstrap";
        }

        console.log('groupedCovidCities');
        console.log(Object.keys(groupedCovidCities).length);

        const filterRange = options.removeZeroes ? [1, Number.MAX_SAFE_INTEGER] : [0, Number.MAX_SAFE_INTEGER];
        console.log("filterRange")
        console.log(filterRange);

        console.log("COLOR_SCALE.length")
        console.log(COLOR_SCALE.length)

        metric = metrics[options.barMetric]
        colorMetric = metrics[options.colorMetric]

        const opacityValue = parseFloat(options.opacity) / 100

        const elevationMultiplier = options.elevationMultiplier >= 0 ? options.elevationMultiplier  : metric.elevationMultiplier
        // console.log(metric)
        maxMetricValue = Object.values(groupedAllCities).map(it => it[0][colorMetric.name] || 0).reduce(function(a, b) {
            return Math.max(a, b);
        });

        console.log("maxMetricValue")
        console.log(maxMetricValue)

        const geojsonLayer = new deck.GeoJsonLayer({
            //data: 'https://servicodados.ibge.gov.br/api/v2/malhas/13?resolucao=5&formato=application/vnd.geo+json',

            // data: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json',
            // data: doIt(),
            data: locationGeoData,
            opacity: opacityValue,

            stroked: false,
            filled: true,
            extruded: true,
            wireframe: true,
            fp64: true,
            // lineWidthUnits: 'pixels',
            // lineWidthMaxPixels: 0,

            getElevation: f => {
                // console.log(f.properties.codarea);
                // console.log( groupedAllCities[f.properties.codarea][0].deaths);
                const metricValue = groupedAllCities[f.properties.codarea][0][metric.name]
                // const elevationMultiplier = metrics[metric.name].elevationMultiplier
                // console.log(metricValue);
                return metricValue * elevationMultiplier + Math.ceil(Math.max(1, metricValue)) * 1000
            },

            // getElevation: f => Math.floor(Math.random() * Math.random() * Math.random() * 500000),
            // getElevation: f => Math.floor(Math.random() * 100000),
            // getFillColor: f => colorScale(f.properties.growth),
            // getFillColor: f => colorScale(Math.floor(Math.random() * 12)),
            // getFillColor: f => colorScale(groupedAllCities[f.properties.codarea][0][colorMetric.name]),
            getFillColor: f => logColorScale(groupedAllCities[f.properties.codarea][0][colorMetric.name], maxMetricValue),


            // getLineColor: f => [255, 255, 255],



            pickable: true,
            updateTriggers: {
                getElevation: [metric, groupedAllCities, date, options],
                getFillColor: [metric, groupedAllCities, date, options, colorMetric],
                getFilterValue: [metric, groupedAllCities, date, options],
                filterRange: [metric, groupedAllCities, date, options],

            },
            extensions: [new DataFilterExtension({ filterSize: 1 })],
            getFilterValue: f => {
                const metricValue = groupedAllCities[f.properties.codarea][0][metric.name] || 0

                return parseInt(metricValue)

            },
            filterRange: filterRange,
            // extensions: [new DataFilterExtension({filterSize: 1})]
            // a
        });

        deckgl.setProps({
            layers: [geojsonLayer],
        });

        deckgl.getMapboxMap().setStyle(mapStyle);
    }

    // function colorScale(x) {
    //     const i = Math.round(x * 7) + 4;
    //     if (x < 0) {
    //         return COLOR_SCALE[i] || COLOR_SCALE[0];
    //     }
    //     return COLOR_SCALE[i] || COLOR_SCALE[COLOR_SCALE.length - 1];
    // }

    function logColorScale(outLocMetric, maxMetricValue, getIdx) {
        let locMetric = 0;
        if (outLocMetric) {
            locMetric = outLocMetric
        }



        const maxScaleIdx = COLOR_SCALE.length - 2;

        const logValue = (Math.log2(locMetric) / Math.log2(maxMetricValue)) * maxScaleIdx


        // let idx = Math.floor(locMetric / 5)
        let idx = Math.ceil(logValue)

        if (locMetric > 0) {
            idx = idx + 1;
        } else {
            idx = 0;
        }


        //idx = Math.min(COLOR_SCALE.length - 1, idx)
        //  console.log(idx)

        if (getIdx) {
            return idx
        }
        return COLOR_SCALE[idx]
    }

    // function colorScale(outLocMetric, getIdx) {
    //     let locMetric = 0;
    //     if (outLocMetric) {
    //         locMetric = outLocMetric
    //     }
    //     // console.log(f.properties.codarea);
    //     // const locMetric = groupedAllCities[x][0][metric.name]
    //     // console.log(locMetric);


    //     let idx = Math.floor(locMetric / 5)
    //     // console.log(idx);
    //     if (locMetric > 0) {
    //         idx = idx + 1
    //     }


    //     idx = Math.min(COLOR_SCALE.length - 1, idx)
    //     //  console.log(idx)

    //     if (getIdx) {
    //         return idx
    //     }
    //     return COLOR_SCALE[idx]
    // }

    function poorManTemplate(tmpl, ...arguments) {
        return arguments.reduce((p,c) => p.replace(/%s/,c), tmpl);
    }

    function getTooltip({ object }) {
        // return object && `${ JSON.stringify( groupedAllCities[object.properties.codarea][0], null, 2)} `;

        if (object) {
            const data = groupedAllCities[object.properties.codarea][0];

            //   Idx: ${colorScale(data[metric.name], true)} <br>
            // <b></b> <br><br>
            // <a href="#" class="btn btn-primary">Go somewhere</a>
        //             Idx: ${logColorScale(data[colorMetric.name], maxMetricValue, true)} / ${COLOR_SCALE.length - 1} <br>
            return {
                html: poorManTemplate(tooltipTmpl,
                    data.city,
                    data.state,
                    data.last_available_deaths || 0,
                    data.last_available_confirmed || 0,
                    data.last_available_confirmed_per_100k_inhabitants || 0 ,
                    data.last_available_date || '',
                    logColorScale(data[colorMetric.name], maxMetricValue, true),
                    COLOR_SCALE.length - 1)
            };
        }
    }

}

doIt()