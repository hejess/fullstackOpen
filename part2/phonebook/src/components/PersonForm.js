import InputWithText from "./InputWithText"
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

  export default PersonForm