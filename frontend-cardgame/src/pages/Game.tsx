import { Card } from '../models/Card';
import CountdownTimer from '../components/CountdownTimer';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Game( {userId }: {userId: string} ) {
  
  const [score, setScore] = useState<number>();
  const [lives, setLives] = useState<number>(0);
  const [card, setCard] = useState<Card>();
  const [playerMessage, setPlayerMessage] = useState("");

  const [endTime, setEndTime] = useState(Date.now() + 5000);

  const countdownRef = useRef();

  useEffect(() => {
    fetchScore();
    fetchLives();
  });

  const navigate = useNavigate();

  async function fetchScore () {
    const response = await fetch("http://localhost:8080/score");
    const json = await response.json();
    setScore(json);
  }

  async function fetchLives () {
    const response = await fetch("http://localhost:8080/lives");
    const json = await response.json();
    setLives(json);
  }

  async function startRound() {

    setEndTime(Date.now() + 5000);
    if (countdownRef.current != undefined) {
      countdownRef.current.start();
    }

    let localPlayerMessage = "";

    await fetch(`http://localhost:8080/start-round?playerName=${userId}`, {
      method: "POST"
    })
    .then(res => res.json())
    .then(json => {
      if (json.message == "DOUBLE_ROUND_ERROR") {
        setPlayerMessage(json.message);
        localPlayerMessage = json.message;
        return ;
      }
      console.log(json.card.cardValue + " OF " + json.card.suit);
      setCard(json.card);
      setPlayerMessage(json.message);
    });

    if (localPlayerMessage === "DOUBLE_ROUND_ERROR") {
      return ;
    }

    await fetch("http://localhost:8080/wait-and-calculate", {
      method: "POST"
    })
    .then(res => res.json())
    .then(json => {
      setCard(json.card);
      setPlayerMessage(json.message);
    });

  }

  function makeChoice(choice: string) {
    fetch("http://localhost:8080/make-choice?playerChoice=" + choice, {
      method: "POST"
    });
  }

  async function resetGame() {
    const response = await fetch("http://localhost:8080/reset", {
      method: "POST"
    });
    const json = await response.json();
    setCard(json.card);
    setPlayerMessage(json.message);
    await fetchScore();
    await fetchLives();
  }

  let isLetterCard = undefined;
  if (card?.cardValue != undefined && ["JACK", "QUEEN", "KING", "ACE"].indexOf(card?.cardValue) > -1) {
    isLetterCard = true;
  } else {
    isLetterCard = false;
  }

  if (userId === "") {
    navigate("/");
    resetGame();
    return ;
  }

  return (
    <div className='game-block'>

      <div>Playing as {userId}</div>

      <img hidden={card?.cardValue === undefined} className={isLetterCard ? "letter-icon" : "number-icon"} src={`/${card?.cardValue}.png`} alt={`The card value of ${card?.cardValue} icon`} />
      <img hidden={card?.suit === undefined} className='suit-icon' src={`/${card?.suit}.png`} alt={`The suit of ${card?.suit} icon`} />
      <br /> <br />
      <button disabled={lives <= 0} onClick={startRound}>Start round</button> <br /> <br />
      <div>
        <button disabled={lives <= 0} onClick={() => makeChoice("LOWER")}>Lower</button>
        <button disabled={lives <= 0} onClick={() => makeChoice("EQUAL")}>Equal</button>
        <button disabled={lives <= 0} onClick={() => makeChoice("HIGHER")}>Higher</button>
      </div>
      <div>Score: {score}</div>
      <div>Lives left: {lives}</div>
      <div>
        <button onClick={resetGame}>Reset game</button>
      </div>

      <div hidden >{playerMessage}</div>

      <h1>{lives===0 ? "GAME OVER!" : ""}</h1>

      <div>
        <CountdownTimer endTime={endTime} countdownRef={countdownRef} />
      </div>

    </div>
  )

}

export default Game