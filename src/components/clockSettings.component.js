import React from "react";
import "./clockSettings.component.scss";

function ClockSettings(props) {
    return (
      <div className='pomodoroClock__settings'>
        <div className='section'>
          <h2 id="break-label" >Break Length</h2>
          <div className='controls'>
            <button
              data-key='breakDuration'
              data-action='sub'
              className='controlButton'
              onClick={props.changeDuration}
              >-</button>
            <p id="break-length" className='controls__text'>{props.session.breakDuration}</p>
            <button
              data-key='breakDuration'
              data-action='add'
              className='controlButton'
              onClick={props.changeDuration}
              >+</button>
          </div>
        </div>
        <div className='section'>
          <h2 id="session-label">Session Length</h2>
          <div className='controls'>
            <button
              data-key='sessionDuration'
              data-action='sub'
              className='controlButton'
              onClick={props.changeDuration}
              >-</button>
            <p id="session-length" className='controls__text'>{props.session.sessionDuration}</p>
            <button
              data-key='sessionDuration'
              data-action='add'
              className='controlButton'
              onClick={props.changeDuration}
              >+</button>
          </div>
        </div>
      </div>
    );
  }

  export default ClockSettings;