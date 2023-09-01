const Person = ({ person, removePerson }) => (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={() => removePerson(person.id)}>delete</button>
      </td>
    </tr>
  )