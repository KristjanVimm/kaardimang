import { useEffect, useState } from 'react'
import './App.css'
import { Card } from './models/Card';

function App() {

  const [score, setScore] = useState<number>();
  const [lives, setLives] = useState<number>();
  const [card, setCard] = useState<Card>();

  useEffect(() => {
    fetch("http://localhost:8080/score")
    .then(res => res.json())
    .then(json => setScore(json));
  }, [card, setCard]);

  useEffect(() => {
    fetch("http://localhost:8080/lives")
    .then(res => res.json())
    .then(json => setLives(json));
  }, [card, setCard]);

  function startRound() {
    fetch("http://localhost:8080/start-round")
    .then(res => res.json())
    .then(json => {
      console.log(json.cardValue + " OF " + json.suit)
      setCard(json);
    });

    fetch("http://localhost:8080/wait-and-calculate", {
      method: "POST"
    })
    .then(res => res.json())
    .then(json => setCard(json));
  }

  function makeChoice(choice: string) {
    fetch("http://localhost:8080/make-choice?playerChoice=" + choice, {
      method: "POST"
    });
  }

  function resetGame() {
    fetch("http://localhost:8080/reset", {
      method: "POST"
    });
    setCard(undefined);
  }

  return (
    <>
      <div>Your card: {card?.cardValue} {card !== undefined ? "OF" : ""} {card?.suit}</div>
      <button disabled={lives === 0} onClick={startRound}>Start game</button>
      <div>
        <button disabled={lives === 0} onClick={() => makeChoice("lower")}>Lower</button>
        <button disabled={lives === 0} onClick={() => makeChoice("equal")}>Equal</button>
        <button disabled={lives === 0} onClick={() => makeChoice("higher")}>Higher</button>
      </div>
      <div>Score: {score}</div>
      <div>Lives left: {lives}</div>
      <div>
        <button onClick={resetGame}>Reset game</button>
      </div>

      <h1>{lives===0 ? "GAME OVER!" : ""}</h1>
    </>
  )
}

export default App
