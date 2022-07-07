import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'
import Time from "./Time";

export default function App() {
  
  const [allDice, setAllDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false)
  const [isActive, setIsActive] = React.useState(false)
  const [time, setTime] = React.useState(0);

  //RANDOM NUMBER
  function randomNumber() {
    return Math.floor(Math.random() * 6 + 1);
  }

  //GENERATE NEW DIE
  function generateNewDie(){
    return {
      value: randomNumber(),
      id: nanoid(),
      isHeld: false,
    }
  }

  //ALL NEW DICE
  function allNewDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(generateNewDie());
    }
    return diceArray;
  }

  //HOLD DICE
  function holdDice(event, diceId) {
    setIsActive(true)
    setAllDice((prevDices) =>
      prevDices.map((dice) => {
        return dice.id === diceId
          ? { ...dice, isHeld: !dice.isHeld }
          : { ...dice };
      })
    );
  }

  //ROLL DICE
  function rollDice() {
    setIsActive(true)
    if(tenzies){
      setAllDice(allNewDice())
      setTenzies(false)
      setTime(0)
      setIsActive(false)
    }
    setAllDice((prevDice) => {
      return prevDice.map((dice) =>
        dice.isHeld ? dice : generateNewDie()
      );
    });
  }

  //GAME OVER
  React.useEffect(function(){
    const diceValue = allDice[0].value
    if(allDice.every(dice => dice.isHeld===true)&&
      allDice.every(dice => dice.value === diceValue)){
        setTenzies(true)
        setIsActive(false)
      }
    }
    ,[allDice])
  
  //DIE ELEMENT
  const dieElement = allDice.map((dice) => (
    <Die
      key={dice.id}
      diceId={dice.id}
      isHeld={dice.isHeld}
      value={dice.value}
      holdDice={holdDice}
    />
  ));

  //STOPWATCH
  React.useEffect(() => {
    let interval = null;
    if (isActive === true) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);
    
  let buttonText = tenzies?"New Game":"Roll Dice"
  let instruction = tenzies?"You Won!":"Roll until all dice are the same. Click each die to freeze it at its current value between rolls."

  return (
    <main className="container">
       {tenzies && <Confetti
      />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">{instruction}</p>
      <div className="die-container">{dieElement}</div>
      <button className="roll-btn" onClick={rollDice}>{buttonText}</button>
      <Time time={time} isActive={isActive}/>
    </main>
  );
}
