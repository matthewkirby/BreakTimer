'use client'

import React from "react";
import styles from "@css/App.module.css";
import Themeing from './Themeing';
import TimerInput from "./TimerInput";
import { Button } from "@mui/material";
import { Alarm, Check, Clear, HourglassEmpty } from "@mui/icons-material";
import useSound from 'use-sound';


const rotateStyle = {
  animation: "spin 2s linear infinite",
  "@keyframes spin": {
    "0%": { transform: "rotate(360deg)" },
    "100%": { transform: "rotate(0deg)" }
  }
}

const App: React.FC<{}> = () => {
  // Time is stored in seconds
  const [minTime, setMinTime] = React.useState<number>(0);
  const [maxTime, setMaxTime] = React.useState<number>(0);
  const timeoutRef = React.useRef<null|ReturnType<typeof setTimeout>>(null);
  const [isTimerActive, setIsTimerActive] = React.useState<boolean>(false);
  const [isTimerDone, setIsTimerDone] = React.useState<boolean>(false);
  const [canButtonRipple, setCanButtonRipple] = React.useState<boolean>(true);
  const [playSound, soundExposedData] = useSound("/alarm.mp3", { loop: true });


  // Helper variables
  const isValidTimeRange = (maxTime >= 0) && (minTime >= 0) && (maxTime - minTime >= 0);


  // Function to start the timer
  const startTimer = () => {
    if (!isValidTimeRange || isTimerActive) { return; }
    const r = Math.random();
    const duration = Math.floor((maxTime - minTime)*r + minTime);
    setIsTimerActive(true);

    const timeoutId = setTimeout(() => {
      setIsTimerDone(true);
      playSound();
    }, duration*1000);
    timeoutRef.current = timeoutId;
  };


  // Function to cancel the timer or stop the alarm
  const cancelTimer = () => {
    if (isTimerDone) {
      soundExposedData.stop();
    } else if (isTimerActive && timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = null;
    setIsTimerActive(false);
    setIsTimerDone(false);
    setCanButtonRipple(true);
  };


  // Helper to disable ripple on button AFTER the effect has happened
  React.useEffect(() => {
    if (isTimerActive)
      setTimeout(() => setCanButtonRipple(false), 1000);
    else
      setCanButtonRipple(true);
  }, [isTimerActive]);




  return (
    <Themeing>
      <div className={styles.vContainer}>
        <div className={styles.hContainer}>
          <TimerInput
            label="Minimum Time"
            timeSeconds={minTime}
            setTimeSeconds={setMinTime}
          />
          <TimerInput
            label="Maximum Time"
            timeSeconds={maxTime}
            setTimeSeconds={setMaxTime}
          />
        </div>
        <Button
          variant="contained"
          color={isTimerActive ? "success" : "primary"}
          size="large"
          startIcon={isTimerActive ? <HourglassEmpty sx={rotateStyle} /> : <Alarm />}
          disabled={!isValidTimeRange || isTimerDone}
          onClick={startTimer}
          disableRipple={!canButtonRipple}
        >
          {isTimerActive ? "Timer Active" : "Start Timer"}
        </Button>
        <Button
          variant="contained"
          color={isTimerDone ? "success" : "error"}
          size="large"
          startIcon={isTimerDone ? <Check /> : <Clear />}
          disabled={!isTimerActive}
          onClick={cancelTimer}
        >
          {isTimerDone ? "Stop Alarm" : "Cancel Timer"}
        </Button>

      </div>
    </Themeing>
  );
};

export default App;