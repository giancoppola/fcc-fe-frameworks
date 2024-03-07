"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var store = require('./clock-state.js').default;
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var marked = require('marked');
// PROJECTOR SELECTOR FOR EXTERNAL TEST SCRIPT:
// eslint-disable-next-line no-unused-vars
var projectName = '25-5-clock';
// Accurate_Interval.js
// Thanks Squeege! For the elegant answer provided to this question:
// http://stackoverflow.com/questions/8173580/setinterval-timing-slowly-drifts-away-from-staying-accurate
// Github: https://gist.github.com/Squeegy/1d99b3cd81d610ac7351
// Slightly modified to accept 'normal' interval/timeout format (func, time).
var accurateInterval = function (fn, time) {
    var cancel, nextAt, timeout, wrapper;
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
var TimerLengthControl = /** @class */ (function (_super) {
    __extends(TimerLengthControl, _super);
    function TimerLengthControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimerLengthControl.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "length-control" },
            react_1.default.createElement("div", { id: //@ts-ignore
                this.props.titleID }, this.props.title),
            react_1.default.createElement("button", { className: "btn-level", 
                //@ts-ignore
                id: this.props.minID, 
                //@ts-ignore
                onClick: this.props.onClick, value: "-" },
                react_1.default.createElement("i", { className: "fa fa-arrow-down fa-2x" })),
            react_1.default.createElement("div", { className: "btn-level", id: //@ts-ignore
                this.props.lengthID }, //@ts-ignore
            this.props.length),
            react_1.default.createElement("button", { className: "btn-level", id: //@ts-ignore
                this.props.addID, onClick: //@ts-ignore
                this.props.onClick, value: "+" },
                react_1.default.createElement("i", { className: "fa fa-arrow-up fa-2x" }))));
    };
    return TimerLengthControl;
}(react_1.default.Component));
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            brkLength: 5,
            seshLength: 25,
            timerState: 'stopped',
            timerType: 'Session',
            timer: 1500,
            intervalID: '',
            alarmColor: { color: 'white' }
        };
        _this.setBrkLength = _this.setBrkLength.bind(_this);
        _this.setSeshLength = _this.setSeshLength.bind(_this);
        _this.lengthControl = _this.lengthControl.bind(_this);
        _this.timerControl = _this.timerControl.bind(_this);
        _this.beginCountDown = _this.beginCountDown.bind(_this);
        _this.decrementTimer = _this.decrementTimer.bind(_this);
        _this.phaseControl = _this.phaseControl.bind(_this);
        _this.warning = _this.warning.bind(_this);
        _this.buzzer = _this.buzzer.bind(_this);
        _this.switchTimer = _this.switchTimer.bind(_this);
        _this.clockify = _this.clockify.bind(_this);
        _this.reset = _this.reset.bind(_this);
        return _this;
    }
    Timer.prototype.setBrkLength = function (e) {
        this.lengthControl('brkLength', e.currentTarget.value, 
        //@ts-ignore
        this.state.brkLength, 'Session');
    };
    Timer.prototype.setSeshLength = function (e) {
        this.lengthControl('seshLength', e.currentTarget.value, 
        //@ts-ignore
        this.state.seshLength, 'Break');
    };
    //@ts-ignore
    Timer.prototype.lengthControl = function (stateToChange, sign, currentLength, timerType) {
        var _a, _b, _c, _d;
        //@ts-ignore
        if (this.state.timerState === 'running') {
            return;
        }
        //@ts-ignore
        if (this.state.timerType === timerType) {
            if (sign === '-' && currentLength !== 1) {
                this.setState((_a = {}, _a[stateToChange] = currentLength - 1, _a));
            }
            else if (sign === '+' && currentLength !== 60) {
                this.setState((_b = {}, _b[stateToChange] = currentLength + 1, _b));
            }
        }
        else if (sign === '-' && currentLength !== 1) {
            this.setState((_c = {},
                _c[stateToChange] = currentLength - 1,
                _c.timer = currentLength * 60 - 60,
                _c));
        }
        else if (sign === '+' && currentLength !== 60) {
            this.setState((_d = {},
                _d[stateToChange] = currentLength + 1,
                _d.timer = currentLength * 60 + 60,
                _d));
        }
    };
    Timer.prototype.timerControl = function () {
        //@ts-ignore
        if (this.state.timerState === 'stopped') {
            this.beginCountDown();
            this.setState({ timerState: 'running' });
        }
        else {
            this.setState({ timerState: 'stopped' });
            //@ts-ignore
            if (this.state.intervalID) {
                //@ts-ignore
                this.state.intervalID.cancel();
            }
        }
    };
    Timer.prototype.beginCountDown = function () {
        var _this = this;
        this.setState({
            intervalID: accurateInterval(function () {
                _this.decrementTimer();
                _this.phaseControl();
            }, 1000)
        });
    };
    Timer.prototype.decrementTimer = function () {
        //@ts-ignore
        this.setState({ timer: this.state.timer - 1 });
    };
    Timer.prototype.phaseControl = function () {
        //@ts-ignore
        var timer = this.state.timer;
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
            }
            else {
                this.beginCountDown();
                //@ts-ignore
                this.switchTimer(this.state.seshLength * 60, 'Session');
            }
        }
    };
    //@ts-ignore
    Timer.prototype.warning = function (_timer) {
        if (_timer < 61) {
            this.setState({ alarmColor: { color: '#a50d0d' } });
        }
        else {
            this.setState({ alarmColor: { color: 'white' } });
        }
    };
    //@ts-ignore
    Timer.prototype.buzzer = function (_timer) {
        if (_timer === 0) {
            //@ts-ignore
            this.audioBeep.play();
        }
    };
    //@ts-ignore
    Timer.prototype.switchTimer = function (num, str) {
        this.setState({
            timer: num,
            timerType: str,
            alarmColor: { color: 'white' }
        });
    };
    Timer.prototype.clockify = function () {
        //@ts-ignore
        if (this.state.timer < 0)
            return "00:00";
        //@ts-ignore
        var minutes = Math.floor(this.state.timer / 60);
        //@ts-ignore
        var seconds = this.state.timer - minutes * 60;
        //@ts-ignore
        seconds = seconds < 10 ? '0' + seconds : seconds;
        //@ts-ignore
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return minutes + ':' + seconds;
    };
    Timer.prototype.reset = function () {
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
    };
    Timer.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "main-title" }, "25 + 5 Clock"),
            react_1.default.createElement(TimerLengthControl
            //@ts-ignore
            , { 
                //@ts-ignore
                addID: "break-increment", length: //@ts-ignore
                this.state.brkLength, lengthID: "break-length", minID: "break-decrement", onClick: this.setBrkLength, title: "Break Length", titleID: "break-label" }),
            react_1.default.createElement(TimerLengthControl
            //@ts-ignore
            , { 
                //@ts-ignore
                addID: "session-increment", length: //@ts-ignore
                this.state.seshLength, lengthID: "session-length", minID: "session-decrement", onClick: this.setSeshLength, title: "Session Length", titleID: "session-label" }),
            react_1.default.createElement("div", { className: "timer", style: //@ts-ignore
                this.state.alarmColor },
                react_1.default.createElement("div", { className: "timer-wrapper" },
                    react_1.default.createElement("div", { id: "timer-label" }, //@ts-ignore
                    this.state.timerType),
                    react_1.default.createElement("div", { id: "time-left" }, this.clockify()))),
            react_1.default.createElement("div", { className: "timer-control" },
                react_1.default.createElement("button", { id: "start_stop", onClick: this.timerControl },
                    react_1.default.createElement("i", { className: "fa fa-play fa-2x" }),
                    react_1.default.createElement("i", { className: "fa fa-pause fa-2x" })),
                react_1.default.createElement("button", { id: "reset", onClick: this.reset },
                    react_1.default.createElement("i", { className: "fa fa-refresh fa-2x" }))),
            react_1.default.createElement("audio", { id: "beep", preload: "auto", ref: function (audio) {
                    //@ts-ignore
                    _this.audioBeep = audio;
                }, src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));
    };
    return Timer;
}(react_1.default.Component));
react_dom_1.default.render(react_1.default.createElement(Timer, null), document.querySelector('#main'));
