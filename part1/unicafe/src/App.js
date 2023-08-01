import { useState } from 'react'

const Display = ({text}) => {
  return (<h3>{text}</h3>)
}

const Button = ({handleClick, text}) => {
  return (<button onClick={handleClick}>{text}</button>)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Display text='give feedback' />
      <Button text='good' handleClick={()=>setGood(good+1)} />
      <Button text='neutral' handleClick={()=>setNeutral(neutral+1)} />
      <Button text='bad' handleClick={()=>setBad(bad+1)} />
      <Display text='statistics' />
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
   
  )
}

export default App