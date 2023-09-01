import { useState, useEffect } from 'react'
import personService from './services/persons'
import ContactsTable from './components/ContactsTable'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import InputWithText from './components/InputWithText'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [notification, setNotification] = useState({
    msg: null,
    type: null
  })
  const [newFilterStr, setNewFilterStr] = useState('')
  const notify = msg => {
    setNotification({ msg, type: 'notification' })
    setTimeout(() => setNotification({ msg: null, type: null }), 3000)
  }
  const warn = msg => {
    setNotification({ msg, type: 'error' })
    setTimeout(() => setNotification({ msg: null, type: null }), 3000)
  }
  const hook = () => {
    personService.getAll().then(persons => setPersons(persons))
  }
  useEffect(hook, []) // By default, effects run after every completed render

  const addPerson = event => {
    event.preventDefault() // default action will cause the page to reload
    const person = persons.find(p => p.name === newName)
    if (person) {
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace the number with a new one?`
        )
      ) {
        const updatedPerson = {
          ...person,
          number: newNum
        }
        personService.update(person.id, updatedPerson).then(updatedPerson => {
          setPersons(persons.map(p => (p.id !== person.id ? p : updatedPerson)))
          notify(`Updated ${newName}`)
          setNewName('')
          setNewNum('')
        })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNum,
        id: new Date().getTime()
      }
      personService.create(newPerson).then(newPerson => {
        setPersons(persons.concat(newPerson))
        notify(`Added ${newName}`)
        setNewName('')
        setNewNum('')
      })
    }
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }
  const handleNumChange = event => {
    setNewNum(event.target.value)
  }
  const handleFilterChange = event => {
    setNewFilterStr(event.target.value)
  }

  const removePerson = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(response => setPersons(persons.filter(p => p.id !== id)))
        .catch(error => {
          warn(`${person.name} was deleted from server.`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const personsToShow =
    newFilterStr === ''
      ? persons
      : persons.filter(person =>
          person.name
            .split(/\s+/)
            .some(namePart =>
              namePart.toLowerCase().startsWith(newFilterStr.toLowerCase())
            )
        )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={notification.msg} type={notification.type} />
      <InputWithText
        text={'Find person name starts with'}
        value={newFilterStr}
        handleChange={handleFilterChange}
      />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={addPerson}
        newName={newName}
        newNum={newNum}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      <ContactsTable
        personsToShow={personsToShow}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App
