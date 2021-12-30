import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import Reset from "./Reset";
import { useState, useEffect, useRef } from "react";
import './Timer.css';

const orange = '#F87272';

function Timer() {
  const Time=45;

  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    secondsLeftRef.current = Time * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return;
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const totalSeconds = Time*60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;

  return (
    <div>
      <div>
        <img src="logo.svg" className="logo"></img>
        <div className="mode">
          <div className="mode1">pomodoro</div>
          <div className="mode2"><span>shortbreak</span></div>
          <div className="mode2"><span>longbreak</span></div>
        </div>
      </div>
      <CircularProgressbar
        value={percentage}
        text={minutes + ':' + seconds}
        styles={buildStyles({
          textColor: '#fff',
          pathColor: orange,
          tailColor: 'rgba(255,255,255,.2)',
        })} />
      <div className="button">
        {isPaused
          ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
          : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
      </div>
    </div>
  );
}

export default Timer;