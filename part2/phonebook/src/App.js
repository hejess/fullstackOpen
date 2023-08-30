import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, removePerson }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td>
      <button onClick={() => removePerson(person.id)}>delete</button>
    </td>
  </tr>
)

const PersonForm = ({
  handleSubmit,
  newName,
  handleNameChange,
  newNum,
  handleNumChange
}) => (
  <form onSubmit={handleSubmit}>
    <InputWithText
      text={'name:'}
      value={newName}
      handleChange={handleNameChange}
    />

    <InputWithText
      text={'number:'}
      value={newNum}
      handleChange={handleNumChange}
    />

    <div>
      <button type='submit'>add</button>
    </div>
  </form>
)

const ContactsTable = ({ personsToShow, removePerson }) => (
  <table>
    <tbody>
      {personsToShow.map(person => (
        <Person key={person.id} person={person} removePerson={removePerson} />
      ))}
    </tbody>
  </table>
)

const Input = ({ value, handleChange }) => (
  <input value={value} onChange={handleChange} />
)

const InputWithText = ({ text, value, handleChange }) => (
  <div>
    {text}
    <Input value={value} handleChange={handleChange} />
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilterStr, setNewFilterStr] = useState('')

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
        personService.update(person.id, updatedPerson).then(updatedPerson=>{
          setPersons(persons.map(p => p.id!==person.id? p : updatedPerson))
          setNewName('')
          setNewNum('')
        })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNum,
        id: persons.length + 1
      }
      personService.create(newPerson).then(newNote => {
        setPersons(persons.concat(newNote))
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
          alert(`${person.name} was deleted from server.`)
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
