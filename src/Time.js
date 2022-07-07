import React from "react";

export default function Time(props) {
  console.log(props.isActive)
  let yourScore = !props.isActive && <span>Your Score: </span>
  return (
      
      <div className="timer">
      {yourScore}
      <span className="digits">
        {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
      </span>
      <span className="digits mili-sec">
        {("0" + ((props.time / 10) % 100)).slice(-2)}
      </span>
    </div>
  
  );
}
