import { useEffect, useState } from 'react'
import './App.css'
import clapsound from './clap.wav'
import kicksound from './kick.wav'
import woopsound from './woop.wav'
import hihatsound from './Hihat.wav'


function Step({ value, stepToggle }) {
  // create one 'step' on the sequencer, which can be applied to the sequencer in an array, 
  return (
    <button className={`step ${value}`} onClick={stepToggle}>

    </button>
  )
}

function Play({ togglePlay, playState }) {
  return (
    <button className={`playbutton ${playState ? 'playing' : 'paused'}`} onClick={togglePlay}>

    </button>
  )
}

function Indicator({ isOn }) {
  return (
    <div className={`indicator ${isOn ? 'on' : 'off'}`}></div>
  )
}

const Clap = new Audio(clapsound)
const Kick = new Audio(kicksound)
const Woop = new Audio(woopsound)
const Hihat = new Audio(hihatsound)

export default function Sequencer() {
  // the 'keyboard' of the sequencer 
  const [currentStepIndex, setCurrentStep] = useState(0)
  const [playState, setPlay] = useState(false)
  const [steps, setSteps] = useState(Array(8).fill('off'));
  const [steps2, setSteps2] = useState(Array(8).fill('off'));
  const [steps3, setSteps3] = useState(Array(8).fill('off'));
  const [steps4, setSteps4] = useState(Array(8).fill('off'));
  const [tempo, setTempo] = useState(85);
  const bpmConverted = (60000 / tempo) / 2;

  useEffect(() => {
    if (!playState) { return }
    const interval = setInterval(() => {
      setCurrentStep(currentStepIndex => {
        console.log(currentStepIndex);
        if (steps[currentStepIndex] === 'on') {
          Clap.currentTime = .1
          Clap.play()
        }
        if (steps2[currentStepIndex] === 'on') {
          Kick.pause()
          Kick.currentTime = 0;
          Kick.play()
        }
        if (steps3[currentStepIndex] === 'on') {
          Woop.pause()
          Woop.currentTime = 0;
          Woop.play()
        }
        if (steps4[currentStepIndex] === 'on') {
          Hihat.pause()
          Hihat.currentTime = 0;
          Hihat.play()
        }
        return (currentStepIndex + 1) % 8
      })
    }, bpmConverted);
    return () => clearInterval(interval);
  }, [playState, steps, steps2, steps3, steps4, bpmConverted]);


  function handlePlay() {
    const nextPlayState = !playState
    setPlay(nextPlayState)
  }

  function handleToggle(buttonClickedIndex, steps, setSteps) {
    const buttonStateAtTimeOfCLick = steps[buttonClickedIndex] === 'on'
    const stepStates = steps.slice();
    if (buttonStateAtTimeOfCLick) {
      turnOff()
    } else {
      turnOn()
    }
    function turnOff() { stepStates[buttonClickedIndex] = 'off' }
    function turnOn() { stepStates[buttonClickedIndex] = 'on' }
    setSteps(stepStates)
  }

  console.log(tempo)
  return (
    <>
      <div className='synthBoard'>

        <div className='topRow'>
          <Play togglePlay={handlePlay} playState={playState} />
          <input value={tempo} onChange={e => setTempo(e.target.value)} type='range' id='tempo' name='tempo' min='30' max='250' />
          <label for='tempo'>{tempo}</label>
        </div>

        <div className='indicator-row'>
          <div></div>
          {Array.from({ length: 8 }, (_, i) => <Indicator isOn={currentStepIndex === (i + 1) % 8} />)}

        </div>
        <div className='sequencer-row'>
          <div className='sequencer-row-id'>clap</div>
          {Array.from({ length: 8 }, (_, i) => <Step value={steps[i]} stepToggle={() => handleToggle(i, steps, setSteps)} />)}

        </div>
        <div className='sequencer-row'>
          <div className='sequencer-row-id'>kick</div>
          {Array.from({ length: 8 }, (_, i) => <Step value={steps2[i]} stepToggle={() => handleToggle(i, steps2, setSteps2)} />)}
        </div>
        <div className='sequencer-row'>
          <div className='sequencer-row-id'>woop</div>
          {Array.from({ length: 8 }, (_, i) => <Step value={steps3[i]} stepToggle={() => handleToggle(i, steps3, setSteps3)} />)}
        </div>
        <div className='sequencer-row'>
          <div className='sequencer-row-id'>hihat</div>
          {Array.from({ length: 8 }, (_, i) => <Step value={steps4[i]} stepToggle={() => handleToggle(i, steps4, setSteps4)} />)}
        </div>
        <div className='sequencer-row'></div>
      </div>

    </>
  )
}

