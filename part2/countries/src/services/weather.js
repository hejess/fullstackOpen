import axios from 'axios'

const baseUrl = 'https://api.open-meteo.com/v1/forecast'

const get = (lat, lng) => {
  const params = {
    latitude: lat,
    longitude: lng,
    current_weather: true,
    hourly: 'temperature_2m,relativehumidity_2m,windspeed_10m'
  }
  console.log(params)
  return axios.get(baseUrl, {params}).then(response => response.data)
}

export default {get};
