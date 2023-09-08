import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries'

const SelectedCountry = ({ country }) => {
  if (country) {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>

        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(lang => (
            <li>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png}></img>
      </div>
    )
  }
}

const CountriesToShow = ({ filtered, setNewFilterStr }) => {
  if (filtered.length > 10 || filtered.length <= 1) {
    console.log(filtered.length)
    return null
  }
  return (
    <div>
      {filtered.map(c => (
        <p key={c}>{c} <button onClick={()=>{setNewFilterStr(c)}}>show</button></p>
      ))}
    </div>
  )
}

const WeatherInfo = ({weather, selectedCountry}) => {
  if (weather === null || selectedCountry === null) {
    return null
  }
  return(
  <div>
    <h2>Weather in {selectedCountry.capital}</h2>
    <p>temperature {weather.temperature} Celcius </p>
    <p>wind {weather.windspeed} m/s</p>
  </div>)
}
const App = () => {
  const [countries, setCountryNames] = useState([])
  // const [notification, setNotification] = useState('')
  const [newFilterStr, setNewFilterStr] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countriesService
      .getAll().then(countries => countries.map(country => country.name.common))
      .then(countryNames => {
        setCountryNames(countryNames)
        console.log(countryNames)
      })
  }, [])

  const handleFilterChange = event => {
    setNewFilterStr(event.target.value)
  }

  const filteredCountries =
    newFilterStr === ''
      ? countries
      : countries.filter(c =>
          c.toLowerCase().includes(newFilterStr.toLowerCase())
        )

  const notification =
    filteredCountries.length > 10 ? 'Enter more chars to filter' : ''

  useEffect(() => {
    if (filteredCountries.length === 1) {
      countriesService
        .get(filteredCountries[0])
        .then(country => setSelectedCountry(country))
    } else {
      setSelectedCountry(null)
    }
  }, [filteredCountries.length])

  useEffect(() => {
    console.log(`selected ${selectedCountry}`)
    if (selectedCountry) {
      const [lat, lng] = selectedCountry.capitalInfo.latlng
      weatherService.get(lat, lng).then(
        weatherData => {setWeather(weatherData.current_weather); console.log(weather.temperature)}

      )
    }
  }, [selectedCountry])
  return (
    <div>
      find countries <input onChange={handleFilterChange} />
      <p>{notification}</p>
      <CountriesToShow filtered={filteredCountries} setNewFilterStr={setNewFilterStr} />
      <SelectedCountry country={selectedCountry} />
      <WeatherInfo weather={weather} selectedCountry={selectedCountry} />
    </div>
  )
}

export default App
