const request = require('request');
const forecasting = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/67c6f1476d070fbde4185188f84a08d8/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);
    request({ url, json: true }, (error, { body}) => {
        if (error) {
            callback('Unable to connect to forecast service', undefined)
        } else if (body.error) {
            callback('No matching results', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature +
                ' degrees out and there is ' + body.currently.precipProbability + '% chance of rain.'+
                'The highest temperature is estimated to be '+body.daily.data[0].temperatureHigh+
                ' and the lowest temperature is estimated to be '+body.daily.data[0].temperatureLow);       
        }
    })

}
module.exports = forecasting
