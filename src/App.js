import './App.scss';
import {bankOne, bankTwo} from './audioClips.js'
import { useEffect, useState } from 'react'

var drumsBg = "https://c1.wallpaperflare.com/preview/146/98/382/drum-drumstick-crossed-light.jpg";
var pianoBg = "https://c4.wallpaperflare.com/wallpaper/784/445/200/dark-piano-room-window-wallpaper-preview.jpg";

function App() {
  const [volume, setVolume] = useState(1);
  const [recording, setRecording] = useState("");
  const [speed, setSpeed] = useState(0.5);
  const [bank, setBank] = useState(bankOne);
  const [background, setBackground] = useState(drumsBg);

  
  const playRecording = () => {
    let index = 0;
    let recordArray = recording.split(" ");
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[index]);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play()
      index++;
    },speed * 600)
    setTimeout(
      () => clearInterval(interval), 600 * speed * recordArray.length -1
    ) 
  } 

  return (
    <div className="App">
      <header className="App-header">
        <div className="container" style={{backgroundImage: `url(${background})`}}>
          <div id="drum-machine">
            {bank.map(clip => (
            <Pad key={clip.id} clip={clip} volume={volume} setRecording={setRecording} />
            ))}
            <br/>
          </div>
          <div id="display">
            <div className="bankButtons">
              <button onClick={() => {setBank(bankOne); setRecording(""); setBackground(drumsBg)}} 
                className ="btn btn-outline-warning btn-sm">
                Heater Kit
              </button>
              <button onClick={() => {setBank(bankTwo); setRecording(""); setBackground(pianoBg)}}
                className ="btn btn-outline-warning btn-sm">
                Smooth Piano Kit
              </button>
            </div>
            <br/>
            <div className="record">
              {recording}
            </div>
            <br/>
              {recording && 
                <>
                  <div className="recordingButtons">
                    <button onClick={playRecording} className="btn btn-outline-warning">Play</button>
                    <button onClick={() => setRecording("")} className="btn btn-outline-danger">Clear</button>
                  </div>
                  <br/>
                  <div className="speed">
                    <h4 className="label">Speed</h4>
                    <input 
                      type="range" 
                      step="0.01" 
                      onChange={(event) => setSpeed(event.target.value)} 
                      value={speed} 
                      max="1.2" 
                      min="0.1" 
                      className="slider w-50"
                    />
                  </div>
                </>
              }
              <br/>
            <div className="volume">
              <h4 className="label">Volume</h4>
              <input 
                type="range" 
                step="0.01" 
                onChange={(event) => setVolume(event.target.value)} 
                value={volume} 
                max="1" 
                min="0" 
                className="slider w-100"
              />
            </div>
          </div> 
        </div>
        <span id="da3ker">by da3ker</span>
      </header>
    </div>
  );
}

function Pad({clip, volume, setRecording}){ 

  const [active, setActive] = useState(false);

  useEffect(() => {
   document.addEventListener('keydown', handleKeyPress);
   return () => {
   document.removeEventListener('keydown', handleKeyPress);
   }
  })

  const handleKeyPress = (event) => {
    if(event.keyCode === clip.keyCode){
      playSound()
    };
  };

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    setActive(true);
    setTimeout(() => setActive(false),200);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setRecording(prev => prev + clip.keyTrigger + " ");
  }

  return (
    <div onClick={playSound} id={clip.id} className={`drum-pad btn btn-outline-warning ${active && "btn-warning"}`}>
      <audio className="clip" id={clip.keyTrigger} src={clip.url}/>
      {clip.keyTrigger}
    </div>
  )
}

export default App;
