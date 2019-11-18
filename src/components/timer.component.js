import React from "react";
import "./timer.component.scss";


function Timer(props) {
    const seconds = new Intl.NumberFormat('en-IN',{minimumIntegerDigits: 2}).format(props.timer.seconds);
    const minutes = new Intl.NumberFormat('en-IN',{minimumIntegerDigits: 2}).format(props.timer.minutes);
    const isAlarm = (props.timer.minutes * 60 + props.timer.seconds) < 60;
    return (
      <div className={`timer textCenter ${isAlarm? 'timer_alarm' : ''}`}>
        <h2 className='timer__header'>{props.timerType}</h2>
        <p className='timer__display'>{minutes}:{seconds}</p>
      </div>
    );
  }

  export default Timer;