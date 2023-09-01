const Input = ({ value, handleChange }) => (
    <input value={value} onChange={handleChange} />
  )
  
  const InputWithText = ({ text, value, handleChange }) => (
    <div>
      {text}
      <Input value={value} handleChange={handleChange} />
    </div>
  )

  export default InputWithText