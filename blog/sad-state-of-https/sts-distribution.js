const raw = {
    "0": 16 ,
    "1": 1 ,
    "1000": 1 ,
    "10886400": 14 ,
    "10893354": 5 ,
    "120": 1 ,
    "1317020400": 1 ,
    "15": 2 ,
    "15120000": 1 ,
    "15552000": 49 ,
    "15552001": 2 ,
    "15555600": 1 ,
    "15638400": 4 ,
    "15724800": 1 ,
    "15768000": 22 ,
    "157680000": 2 ,
    "15768001": 1 ,
    "15778463": 1 ,
    "15778800": 1 ,
    "15811200": 1 ,
    "16070400": 8 ,
    "17280000": 1 ,
    "18144000": 1 ,
    "21600": 1 ,
    "259200": 1 ,
    "2592000": 14 ,
    "2628000": 1 ,
    "2678400": 1 ,
    "300": 2 ,
    "3000000": 1 ,
    "31104000": 1 ,
    "31449600": 1 ,
    "31536000": 257 ,
    "315360000": 3 ,
    "31556926": 6 ,
    "31557600": 2 ,
    "31622400": 2 ,
    "360": 1 ,
    "3600": 4 ,
    "36000": 1 ,
    "47336400": 1 ,
    "600": 2 ,
    "604800": 11 ,
    "608400": 1 ,
    "63072000": 18 ,
    "631138519": 5 ,
    "631138520": 1 ,
    "63113904": 2 ,
    "631152000": 3 ,
    "7200": 1 ,
    "7776000": 7 ,
    "86400": 6 ,
    "8640000": 1 ,
    "86400000": 1 ,
    "900": 1
}

const num_cmp = (a,b) => Number(a) - Number(b)

const ages = Object.keys(raw)
             .map( str=>Number(str) )
             .sort( num_cmp )

const MINUTE = 60
    , HOUR   = MINUTE * 60
    , DAY    = HOUR * 24

// break points for reduction
const breaks = [
    MINUTE,
    HOUR,
    DAY,
    DAY * 30,
    DAY * 180,
    DAY * 365,
    Infinity
]

const sumSamples = (sum, age) => sum + raw[''+age]

let sum = ages.reduce( sumSamples, 0 )

let dist = breaks.map( (upr, idx) => {
    let count = ages.filter( age => age<=upr )
                    .reduce( sumSamples, 0 )
    return [
        upr,
        count,
        Math.round(count/sum*1000)/10
    ]
})

console.log(dist)
