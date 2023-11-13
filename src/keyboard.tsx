import { useEffect, useRef } from "react";

const audioCtx = new AudioContext();
const c4 = 261.63;
const d4 = 293.66;
const e4 = 329.63;
const f4 = 349.23;
const g4 = 392;
const a4 = 440;
const b4 = 493.88;
const c5 = 523.25;

const oscillators = {};
const keyDown = {};
const notes = [{
    pitch: c4, letter: 'a', name: 'C'
}, {
    pitch: d4, letter: 's', name: 'D'
}, {
    pitch: e4, letter: 'd', name: 'E'
}, {
    pitch: f4, letter: 'f', name: 'F'
}, {
    pitch: g4, letter: 'g', name: 'G'
}, {
    pitch: a4, letter: 'h', name: 'A'
}, {
    pitch: b4, letter: 'j', name: 'B'
}, {
    pitch: c5, letter: 'k', name: 'C'
}];

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(keyEvent: KeyboardEvent) {
    console.log('handleKeyDown')
    if (keyDown[keyEvent.key]) {
        return
    }
    const noteFound = notes.find(note => { return note.letter === keyEvent.key });

    if (noteFound) {
        PlayNote(noteFound.pitch, keyEvent.key)
        keyDown[keyEvent.key] = true;
        console.log('key down');
    };
}

function handleKeyUp(keyEvent: KeyboardEvent) {
    const noteFound = notes.find(note => { return note.letter === keyEvent.key });
    if (noteFound) {
        StopPlay(keyEvent.key)
        console.log('key up');
        keyDown[keyEvent.key] = false;
    };
}

function PlayNote(noteToPlay, keyboardInput) {
    const oscillatorNode = audioCtx.createOscillator();
    oscillators[keyboardInput] = oscillatorNode;
    oscillatorNode.connect(audioCtx.destination);
    oscillatorNode.type = "triangle";
    oscillatorNode.frequency.setValueAtTime(noteToPlay, audioCtx.currentTime);
    oscillatorNode.start();
}

function StopPlay(keyboardInput) {
    oscillators[keyboardInput].stop()
}


function Key({ note }) {

    return (
        <button className="keyboard-key">{note.name}</button>
    )
}



export default function Keyboard() {

    return (
        Array.from({ length: notes.length }, (_, i) => <Key key={i} note={notes[i]} />)
    )
}
