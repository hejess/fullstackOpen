const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({
  part,
}) => (
  <p>
      {part.name} {part.exercises}
  </p>
)
const Content = ({
  part1,
  part2,
  part3
}) => (
  <>
    <Part part={part1} />
    <Part part={part2} />
    <Part part={part3} />
  </>
)

const Total = ({ total }) => (
  <p>Number of exercises {total}</p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  let parts = course.parts
  return (
    <div>
      <Header course={course.name} />
      <Content
        part1={parts[0]}
        part2={parts[1]}
        part3={parts[2]}
      />
      <Total
        total={parts[0].exercises+parts[1].exercises+parts[2].exercises}
      />     
    </div>
  )
}

export default App
