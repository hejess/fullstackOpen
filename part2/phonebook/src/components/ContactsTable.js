const Person = ({ person, removePerson }) => (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={() => removePerson(person.id)}>delete</button>
      </td>
    </tr>
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

  export default ContactsTable