import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
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

const ContactsTable = ({ personsToShow }) => (
  <table>
    <tbody>
      {personsToShow.map(person => (
        <Person key={person.id} person={person} />
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
    personService.getAll()
      .then(persons => setPersons(persons))
  }
  useEffect(hook, []) // By default, effects run after every completed render

  const addPerson = event => {
    event.preventDefault() // default action will cause the page to reload
    console.log(persons)

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already in the phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNum,
      id: persons.length + 1,
    }
    personService.create(
      newPerson
    ).then(newNote => {
      setPersons(persons.concat(newNote))
      setNewName('')
      setNewNum('')
    })
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
      <ContactsTable personsToShow={personsToShow} />
    </div>
  )
}

export default App
