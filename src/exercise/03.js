// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const Name = React.memo(({name, onNameChange}) => {
  console.log('Name render')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={e => onNameChange(e.target.value)}
      />
    </div>
  )
})

// 🐨 accept `animal` and `onAnimalChange` props to this component
const FavoriteAnimal = React.memo(({animal, onAnimalChange}) => {
  console.log('Animal Render')
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={e => onAnimalChange(e.target.value)}
      />
    </div>
  )
})
// function FavoriteAnimal() {
//   // 💣 delete this, it's now managed by the App
//   // const [animal, setAnimal] = React.useState('')

// }

// 🐨 uncomment this
function Display({name, animal}) {
  console.log('Display Render')
  return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
}

// 💣 remove this component in favor of the new one
// function Display({name}) {
//   return <div>{`Hey ${name}, you are great!`}</div>
// }

function App() {
  // 🐨 add a useState for the animal
  const [name, setName] = React.useState('')
  const [animal, setAnimal] = React.useState('')

  // const onNameChange = value => {
  //   setName(value)
  // }
  // const onAnimalChange = value => {
  //   setAnimal(value)
  // }

  const onNameChange = React.useCallback(
    value => {
      setName(value)
    },
    [setName],
  )
  const onAnimalChange = React.useCallback(
    value => {
      setAnimal(value)
    },
    [setAnimal],
  )
  return (
    <form>
      <Name name={name} onNameChange={onNameChange} />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal animal={animal} onAnimalChange={onAnimalChange} />
      {/* 🐨 pass the animal prop here */}
      <Display name={name} animal={animal} />
    </form>
  )
}

export default App
