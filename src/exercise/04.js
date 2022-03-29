// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useState} from 'react'
import {useLocalStorageState} from '../utils'
const initialState = Array(9).fill(null)
// const useLocalStorage = (key, initialData) => {
//   const [squares, setSquares] = React.useState(
//     () => window.localStorage.getItem(key) ?? initialData,
//   )
//   console.log(window.localStorage.getItem(key))
//   React.useEffect(() => {
//     window.localStorage.setItem(key, squares)
//   }, [squares, key])
//   return [squares, setSquares]
// }
const useLocalStorage = () => {
  const [squares, setSquares] = React.useState(
    () => JSON.parse(window.localStorage.getItem('tic')) ?? initialState,
  )
  React.useEffect(() => {
    console.log('Effect Running')
    window.localStorage.setItem('tic', JSON.stringify(squares))
  }, [squares])
  return [squares, setSquares]
}

function Board({onClick, squares}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [current, setCurrent] = useLocalStorageState('tic-step', 0)
  const [history, setHistory] = useLocalStorageState('tic-history', [
    Array(9).fill(null),
  ])
  const currentSquares = history[current]
  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)
  // currentSquares[0] = 'X'
  // console.log(nextValue)
  function selectSquare(square) {
    if (winner || currentSquares[square]) {
      return
    }
    const newHistory = history.slice(0, current + 1)
    const squares = [...currentSquares]

    squares[square] = nextValue
    setHistory([...newHistory, squares])
    setCurrent(newHistory.length)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setCurrent(0)
  }

  const setCurrentStep = () => {}

  const moves = history.map((squares, step) => {
    const desc = step ? `Go to #${step}` : 'Go to Start'
    const isCurrent = step === current
    return (
      <li key={step}>
        <button disabled={isCurrent} onClick={() => setCurrent(step)}>
          {desc} {isCurrent ? '(current)' : null}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
