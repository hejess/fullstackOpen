import { useState, useEffect } from 'react'
import axios from 'axios'

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
        {Object.values(country.languages).map(lang=><li>{lang}</li>)}
        </ul>
        <img src={country.flags.png}></img>
      </div>
    )
  }
}
const CountriesToShow = ({ filtered }) => {
  if (filtered.length > 10 || filtered.length <= 1) {
    console.log(filtered.length)
    return null
  }
  return (
    <div>
      {filtered.map(c => (
        <p key={c}>{c}</p>
      ))}
    </div>
  )
}
const App = () => {
  const [countries, setCountries] = useState([])
  // const [notification, setNotification] = useState('')
  const [newFilterStr, setNewFilterStr] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`${baseURL}/api/all`)
      .then(response => response.data.map(country => country.name.common))
      .then(countries => {
        setCountries(countries)
        console.log(countries)
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
      axios
        .get(`${baseURL}/api/name/${filteredCountries[0]}`)
        .then(response => setSelectedCountry(response.data))
    } else {
      setSelectedCountry(null)
    }

  }, [filteredCountries])
  return (
    <div>
      find countries <input onChange={handleFilterChange} />
      <p>{notification}</p>
      <CountriesToShow filtered={filteredCountries} />
      <SelectedCountry country={selectedCountry} />
    </div>
  )
}

export default App
