import Redux, { Dispatch, Store, legacy_createStore } from 'redux';
const store: Store = require('./drums-state.js').default;
import {updatePlaying, updateSamples, updateVolume, iState, iSample} from './drums-state.js';
import {ConnectedProps, MapStateToProps, Provider, connect} from 'react-redux';
import React, {useState, useEffect, PropsWithoutRef} from 'react';
import ReactDOM from 'react-dom';
const marked = require('marked')


const Drums = (props: any) => {
    console.log(props);
    useEffect( () => {
        let drums = document.querySelectorAll('.drum-pad');
        drums.forEach((drum: HTMLButtonElement) => {
            drum.addEventListener('click', (e) => {
                let audio = (e.target as HTMLButtonElement).querySelector('audio');
                (audio as HTMLAudioElement).play();
                props.updatePlaying(audio.getAttribute('data-name'));
            })
        })
    }, []);
    useEffect( () => {
        let audios = document.querySelectorAll('audio');
        audios.forEach((audio) => {
            audio.volume = (props.volume / 100);
        })
    }, [props.volume])
    return (
        <div className="drums" id="drums">
            {(props.samples as Array<iSample>).map((sample) => {
                window.addEventListener('keydown', (e) => {
                    let code = "Key" + sample.key;
                    if (e.code == code){
                        let audio: HTMLAudioElement = document.querySelector(`audio#${sample.key}`);
                        audio.volume = (props.volume / 100);
                        (audio as HTMLAudioElement).play();
                        props.updatePlaying(audio.getAttribute('data-name'));
                    }
                })
                return (
                    <button id={sample.name} className="drum-pad" data-key={sample.key}>
                        {sample.key}
                        <audio src={sample.audio} className="clip" id={sample.key} data-name={sample.name}></audio>
                    </button>
                )
            })}
        </div>
    )
}

const Controls = (props: any) => {
    useEffect(() => {
        const vol: HTMLInputElement = document.querySelector('#volume');
        vol.addEventListener('input', (e) => {
            props.updateVolume((e.target as HTMLInputElement).value);
            let audios = document.querySelectorAll('audio');
            audios.forEach((audio) => {
                audio.volume = props.volume / 100;
            })
        })
    }, [])
    return (
        <div className="controls" id="controls">
            <h4 className="display" id="display">{props.playing}</h4>
            <input type="range" min="1" max="100" value={props.volume} className="volume" id="volume"></input>
        </div>
    )
}

const App = (props: any) => {
    console.log(props);
    return (
        <div id='drum-machine' className='drum-machine'>
            <Drums samples={props.samples} updatePlaying={props.updatePlaying} volume={props.volume}/>
            <Controls playing={props.playing} volume={props.volume}
            updateVolume={props.updateVolume} updateSamples={props.updateSamples}
            />
        </div>
    )
}

const AppWrapper = (props: any) => {
    return (
        <Provider store={store}>
            <Container />
        </Provider>
    )
}

const mapStateToProps: MapStateToProps<any, any, iState> = (state: iState) => {
    return {
        playing: state.playing,
        volume: state.volume,
        samples: state.samples
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updatePlaying: (text: string) => dispatch(updatePlaying(text)),
        updateVolume: (volume: number) => dispatch(updateVolume(volume)),
        updateSamples: (samples: Array<iSample>) => dispatch(updateSamples(samples))
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(<AppWrapper/>, document.querySelector('#main'));