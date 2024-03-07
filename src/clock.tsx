
import Redux, { Dispatch, Store, legacy_createStore } from 'redux';
const store: Store = require('./clock-state.js').default;
import {iState, breakTime, end, ready, READY, restart, set, END, tick, SESSION, BREAK, sessionTime} from './clock-state.js';
import {ConnectedProps, MapStateToProps, Provider, connect} from 'react-redux';
import React, {useState, useEffect, PropsWithoutRef} from 'react';
import ReactDOM from 'react-dom';
const marked = require('marked')

// PROJECTOR SELECTOR FOR EXTERNAL TEST SCRIPT:
// eslint-disable-next-line no-unused-vars
const projectName = '25-5-clock';

// Accurate_Interval.js
// Thanks Squeege! For the elegant answer provided to this question:
// http://stackoverflow.com/questions/8173580/setinterval-timing-slowly-drifts-away-from-staying-accurate
// Github: https://gist.github.com/Squeegy/1d99b3cd81d610ac7351
// Slightly modified to accept 'normal' interval/timeout format (func, time).

const accurateInterval = function (fn: any, time: any) {
  var cancel: any, nextAt: any, timeout: any, wrapper: any;
  nextAt = new Date().getTime() + time;
  timeout = null;
  wrapper = function () {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  cancel = function () {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel
  };
};

// COMPONENTS:
class TimerLengthControl extends React.Component {
  render() {
    return (
      <div className="length-control">
        <div id={//@ts-ignore
        this.props.titleID}>{this.props.title}</div>
        <button
          className="btn-level"
          //@ts-ignore
          id={this.props.minID}
          //@ts-ignore
          onClick={this.props.onClick}
          value="-"
        >
          <i className="fa fa-arrow-down fa-2x" />
        </button>
        <div className="btn-level" id={//@ts-ignore
        this.props.lengthID}>
          {//@ts-ignore
          this.props.length}
        </div>
        <button
          className="btn-level"
          id={//@ts-ignore
            this.props.addID}
          onClick={//@ts-ignore
            this.props.onClick}
          value="+"
        >
          <i className="fa fa-arrow-up fa-2x" />
        </button>
      </div>
    );
  }
}

class Timer extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      brkLength: 5,
      seshLength: 25,
      timerState: 'stopped',
      timerType: 'Session',
      timer: 1500,
      intervalID: '',
      alarmColor: { color: 'white' }
    };
    this.setBrkLength = this.setBrkLength.bind(this);
    this.setSeshLength = this.setSeshLength.bind(this);
    this.lengthControl = this.lengthControl.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.beginCountDown = this.beginCountDown.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.phaseControl = this.phaseControl.bind(this);
    this.warning = this.warning.bind(this);
    this.buzzer = this.buzzer.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.clockify = this.clockify.bind(this);
    this.reset = this.reset.bind(this);
  }
  setBrkLength(e: any) {
    this.lengthControl(
      'brkLength',
      e.currentTarget.value,
      //@ts-ignore
      this.state.brkLength,
      'Session'
    );
  }
  setSeshLength(e: any) {
    this.lengthControl(
      'seshLength',
      e.currentTarget.value,
      //@ts-ignore
      this.state.seshLength,
      'Break'
    );
  }
  //@ts-ignore
  lengthControl(stateToChange, sign, currentLength, timerType) {
    //@ts-ignore
    if (this.state.timerState === 'running') {
      return;
    }
    //@ts-ignore
    if (this.state.timerType === timerType) {
      if (sign === '-' && currentLength !== 1) {
        this.setState({ [stateToChange]: currentLength - 1 });
      } else if (sign === '+' && currentLength !== 60) {
        this.setState({ [stateToChange]: currentLength + 1 });
      }
    } else if (sign === '-' && currentLength !== 1) {
      this.setState({
        [stateToChange]: currentLength - 1,
        timer: currentLength * 60 - 60
      });
    } else if (sign === '+' && currentLength !== 60) {
      this.setState({
        [stateToChange]: currentLength + 1,
        timer: currentLength * 60 + 60
      });
    }
  }
  timerControl() {
    //@ts-ignore
    if (this.state.timerState === 'stopped') {
      this.beginCountDown();
      this.setState({ timerState: 'running' });
    } else {
      this.setState({ timerState: 'stopped' });
      //@ts-ignore
      if (this.state.intervalID) {
        //@ts-ignore
        this.state.intervalID.cancel();
      }
    }
  }
  beginCountDown() {
    this.setState({
      intervalID: accurateInterval(() => {
        this.decrementTimer();
        this.phaseControl();
      }, 1000)
    });
  }
  decrementTimer() {
    //@ts-ignore
    this.setState({ timer: this.state.timer - 1 });
  }
  phaseControl() {
    //@ts-ignore
    let timer = this.state.timer;
    this.warning(timer);
    this.buzzer(timer);
    if (timer < 0) {
        //@ts-ignore
      if (this.state.intervalID) {
        //@ts-ignore
        this.state.intervalID.cancel();
      }
      //@ts-ignore
      if (this.state.timerType === 'Session') {
        this.beginCountDown();
        //@ts-ignore
        this.switchTimer(this.state.brkLength * 60, 'Break');
      } else {
        this.beginCountDown();
        //@ts-ignore
        this.switchTimer(this.state.seshLength * 60, 'Session');
      }
    }
  }
  //@ts-ignore
  warning(_timer) {
    if (_timer < 61) {
      this.setState({ alarmColor: { color: '#a50d0d' } });
    } else {
      this.setState({ alarmColor: { color: 'white' } });
    }
  }
  //@ts-ignore
  buzzer(_timer) {
    if (_timer === 0) {
        //@ts-ignore
      this.audioBeep.play();
    }
  }
  //@ts-ignore
  switchTimer(num, str) {
    this.setState({
      timer: num,
      timerType: str,
      alarmColor: { color: 'white' }
    });
  }
  clockify() {
    //@ts-ignore
    if (this.state.timer < 0) return "00:00";
    //@ts-ignore
    let minutes = Math.floor(this.state.timer / 60);
    //@ts-ignore
    let seconds = this.state.timer - minutes * 60;
    //@ts-ignore
    seconds = seconds < 10 ? '0' + seconds : seconds;
    //@ts-ignore
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }
  reset() {
    this.setState({
      brkLength: 5,
      seshLength: 25,
      timerState: 'stopped',
      timerType: 'Session',
      timer: 1500,
      intervalID: '',
      alarmColor: { color: 'white' }
    });
    //@ts-ignore
    if (this.state.intervalID) {
        //@ts-ignore
      this.state.intervalID.cancel();
    }
    //@ts-ignore
    this.audioBeep.pause();
    //@ts-ignore
    this.audioBeep.currentTime = 0;
  }
  render() {
    return (
      <div>
        <div className="main-title">25 + 5 Clock</div>
        <TimerLengthControl
        //@ts-ignore
          addID="break-increment"
          length={//@ts-ignore
            this.state.brkLength}
          lengthID="break-length"
          minID="break-decrement"
          onClick={this.setBrkLength}
          title="Break Length"
          titleID="break-label"
        />
        <TimerLengthControl
        //@ts-ignore
          addID="session-increment"
          length={//@ts-ignore
            this.state.seshLength}
          lengthID="session-length"
          minID="session-decrement"
          onClick={this.setSeshLength}
          title="Session Length"
          titleID="session-label"
        />
        <div className="timer" style={//@ts-ignore
        this.state.alarmColor}>
          <div className="timer-wrapper">
            <div id="timer-label">{//@ts-ignore
            this.state.timerType}</div>
            <div id="time-left">{this.clockify()}</div>
          </div>
        </div>
        <div className="timer-control">
          <button id="start_stop" onClick={this.timerControl}>
            <i className="fa fa-play fa-2x" />
            <i className="fa fa-pause fa-2x" />
          </button>
          <button id="reset" onClick={this.reset}>
            <i className="fa fa-refresh fa-2x" />
          </button>
        </div>
        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            //@ts-ignore
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    );
  }
}

ReactDOM.render(<Timer/>, document.querySelector('#main'));