import { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(
    Array.from({ length: anecdotes.length }, () => 0)
  )

  const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
  }

  const handleVote = i => {
    let copy = [...points]
    copy[i] += 1
    console.log('before', points)
    console.log('after', copy)
    setPoints(copy)
  }

  const handleSelected = () => {
    let r = getRandomInt(0, anecdotes.length)
    console.log(r)
    setSelected(r)
  }

  const getMostVoted = () => {
    const max = Math.max(...points)
    const i = points.indexOf(max)
    return anecdotes[i]
  }

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]}</p>
      <Button text='vote' handleClick={() => handleVote(selected)} />
      <Button text='next anecdote' handleClick={handleSelected} />
      <h3>Anecdote with most votes</h3>
      <p>{getMostVoted()}</p>
    </div>
  )
}

export default App
