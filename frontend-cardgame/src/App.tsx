import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {

  // const cardRef = useRef({cardValue: "", suit: "", cardRank: ""});
  // const lastCardRef = useRef({cardValue: "", suit: "", cardRank: ""});
  const choiceRef = useRef("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const [card, setCard] = useState({cardValue: "", suit: "", cardRank: ""});
  const [lastCard, setLastCard] = useState({cardValue: "", suit: "", cardRank: ""});
  

  async function updateChoice (updatedValue: string) {
    choiceRef.current = updatedValue;
  }

  // async function updateCard (updatedValue: {cardValue: string, suit: string, cardRank: string}) {
  //   cardRef.current = updatedValue;
  // }

  // async function updateLastCard (updatedValue: {cardValue: string, suit: string, cardRank: string}) {
  //   lastCardRef.current = updatedValue;
  // }

  // function showFirstCard() {
  //   fetch("http://localhost:8080/start-round")
  //   .then(res => res.json())
  //   .then(json => {
  //     console.log(json);
  //     updateCard(json);
  //     updateLastCard(json);
  //   });
  // }


  // useEffect(() => {
  //   fetch("http://localhost:8080/start-round")
  //   .then(res => res.json())
  //   .then(json => {
  //     console.log(json);
  //     updateCard(json);
  //     updateLastCard(json);
  //   });
  // }, []);

  useEffect(() => {
    fetch("http://localhost:8080/start-round")
    .then(res => res.json())
    .then(json => {
      console.log(json);
      setCard(json);
      setLastCard(json);
      // updateLastCard(json);
    });
  }, []);

  useEffect(() => {
    
  }, [setCard]);

  useEffect(() => {
    
  }, [setLastCard]);

  async function startRound() {

    if (lives == 0) {
      alert("out of lives");
      return null;
    }
    updateChoice("");
    // await sleep(3500);
    fetch("http://localhost:8080/start-round")
    .then(res => res.json())
    // .then(json => updateCard(json));
    .then(json => setCard(json));
    console.log("player's choice: " + choiceRef.current);
    // console.log("last card: " + lastCardRef.current.cardValue);
    // console.log("current card: " + cardRef.current.cardValue);
    console.log("last card: " + lastCard.cardValue);
    console.log("current card: " + card.cardValue);
    
    // if (lastCardRef.current.cardRank == "") {
    if (lastCard.cardRank == "") {
      console.log("first round");
    } else {
      updateScore();
    }
    // updateLastCard(cardRef.current);
    setLastCard(card);

  }

  function updateScore () {
    
    let rightAnswer = "";
    // if (cardRef.current.cardRank < lastCardRef.current.cardRank) {
    if (card.cardRank < lastCard.cardRank) {
      rightAnswer = "lower";
    // } else if (cardRef.current.cardRank > lastCardRef.current.cardRank) {
    } else if (card.cardRank > lastCard.cardRank) {
      rightAnswer = "higher";
    } else {
      rightAnswer = "equal";
    }
    if (choiceRef.current == rightAnswer) {
      setScore(a => a + 1);
    } else {
      setLives(a => a - 1);
    }
  }

  async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  // useEffect(() => {
  //   setChoice("");
  // })

  
  // useEffect(() => {
  //   fetch("http://localhost:8080/start-round")
  //   .then(res => res.json())
  //   .then(json => setCard(json));
  // }, []);

  return (
    <>
      <div ></div>
      <button onClick={() => startRound()}>Start game</button>
      {/* <div>mäng käib</div> */}
      {/* <div>current card: {cardRef.current.cardValue}</div> */}
      <div>current card: {card.cardValue}</div>
      <button onClick={() => updateChoice("higher")}>higher</button>
      <button onClick={() => updateChoice("lower")}>lower</button>
      <button onClick={() => updateChoice("equal")}>equal</button>
      <div>score: {score}</div>
      <div>lives: {lives}</div>

    </>
  )
}

export default App
