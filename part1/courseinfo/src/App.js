const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({
  part,
  exercise
}) => (
  <p>
      {part} {exercise}
  </p>
)
const Content = ({
  part1,
  exercises1,
  part2,
  exercises2,
  part3,
  exercises3
}) => (
  <>
    <Part part={part1} exercise={exercises1} />
    <Part part={part2} exercise={exercises2} />
    <Part part={part3} exercise={exercises3} />
  </>
)

const Total = ({ exercises1, exercises2, exercises3 }) => (
  <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
)

// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 = 14

//   return (
//     <div>
      // <Header course={course} />
      // <Content
      //   part1={part1}
      //   exercises1={exercises1}
      //   part2={part2}
      //   exercises2={exercises2}
      //   part3={part3}
      //   exercises3={exercises3}
      // />
      // <Total
      //   exercises1={exercises1}
      //   exercises2={exercises2}
      //   exercises3={exercises3}
      // />
//     </div>
//   )
// }


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1.name}
        exercises1={part1.exercises}
        part2={part2.name}
        exercises2={part2.exercises}
        part3={part3.name}
        exercises3={part3.exercises}
      />
      <Total
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />     
    </div>
  )
}

export default App
