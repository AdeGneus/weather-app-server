const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&precipitation`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather service");
    } else if (body.error) {
      callback("Unable to find location.");
    } else {
      callback(undefined, {
        latitude: body.latitude,
        longitude: body.longitude,
        temperature: body.current_weather.temperature,
      });
    }
  });
};

module.exports = forecast;
