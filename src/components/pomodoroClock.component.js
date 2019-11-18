import React, {Component} from "react";

import ClockSettings from "./clockSettings.component";
import Timer from "./timer.component";
import TimerControls from "./timerControls.component";

import "./pomodoroClock.component.scss";

class PomodoroClock extends Component {
    constructor(props) {
      super(props);
      this.state = {
        timer: {
          minutes: 25,
          seconds: 0,
        },
        session: {
          breakDuration: 5,
          sessionDuration: 25,
        },
        timerType: 'Session',
      }
      this.startTimer = this.startTimer.bind(this);
      this.stopTimer = this.stopTimer.bind(this);
      this.resetTimer = this.resetTimer.bind(this);
      this.changeDuration = this.changeDuration.bind(this);
      this.beginCounting = this.beginCounting.bind(this);
    }
    
    startTimer() {
      if (this.timerID) {
        this.stopTimer();
        return;
      }
      let timerDuration = this.state.timer.minutes*60 + this.state.timer.seconds;
      this.beginCounting(timerDuration);
    }
    
    beginCounting(duration) {
      let timerDuration = duration;
      this.timerID = setInterval(() => {
        timerDuration -= 1;
        this.phaseControl(timerDuration);
        this.setState({
          timer: {
            minutes: parseInt(timerDuration / 60),
            seconds: parseInt(timerDuration % 60),
          }
        });
      },1000);
    }
    
    phaseControl(restTime) {
      if (restTime > 0) return;
      this.audioBeep.play();
      const timerType = this.state.timerType;
      switch (timerType) {
        case 'Session':
          clearInterval(this.timerID);
          this.beginCounting(this.state.session.breakDuration*60 + 1);
          break;
        case 'Break':
          clearInterval(this.timerID);
          this.beginCounting(this.state.session.sessionDuration*60 + 1);
        default:
          break;
      }
      this.setState({
        timerType: timerType ==='Session'? 'Break' : 'Session',
      });
    }
    
    resetTimer() {
      this.audioBeep.pause();
      this.audioBeep.currentTime = 0;
      this.stopTimer();
      this.setState({
        timer: {
          minutes: 25,
          seconds: 0,
      },
        session: {
          breakDuration: 5,
          sessionDuration: 25,
        },
        timerType: 'Session',
      });
    }
    
    stopTimer() {
      clearInterval(this.timerID);
      this.timerID = null;
    }
    
    changeDuration(e) {
      if (this.timerID) return;
      const key = e.target.dataset.key;
      const action = e.target.dataset.action;
      const session = this.state.session;
      let value = session[key];
      if (action === 'add') {
        if (value === 60) return;
        value += 1;
      } else if (action === 'sub') {
        if (value === 1) return;
        value -= 1;
      }
      session[key] = value;
      this.setState({
        timer: {
          minutes: key==='sessionDuration'? value : this.state.timer.minutes,
          seconds: key==='sessionDuration'? 0: this.state.timer.seconds,
        },
        session: session,
      });
    }
    
    render() {
      const timerFunctions = {
        start: this.startTimer,
        stop: this.stopTimer,
        reset: this.resetTimer,
      }
      return (
        <div className='pomodoroClock bgDark'>
          <h1 className='header'>Pomodoro Clock</h1>
          <ClockSettings 
            session={this.state.session}
            changeDuration={this.changeDuration}
            />
          <Timer
            timer={this.state.timer}
            timerType={this.state.timerType}
            />
          <TimerControls
            timerFunctions={timerFunctions}
            />
          <audio preload="auto"
            src="https://goo.gl/65cBl1"
            ref={(audio) => { this.audioBeep = audio; }} />
        </div>
      );
    }
  }

  export default PomodoroClock;