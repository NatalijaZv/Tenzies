import React from "react";

export default function Die(props){
    
    return(
        <div style={{background:props.isHeld?"#59E391":"none"}} className="die-face" onClick={(event)=>props.holdDice(event,props.diceId)}>
            {props.value}
        </div>
    )
}