import React from "react";

import "./timerControls.component.scss";

function TimerControls(props) {
    return (
      <div className='controls textCenter'>
        <button className='controlButton' onClick={props.timerFunctions.start}>▶</button>
        <button className='controlButton' onClick={props.timerFunctions.stop}>||</button>
        <button className='controlButton' onClick={props.timerFunctions.reset}>⟲</button>
      </div>
    );
}

export default TimerControls;