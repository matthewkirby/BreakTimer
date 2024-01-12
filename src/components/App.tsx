'use client'

import React from "react";
import styles from "@css/App.module.css";
import Themeing from './Themeing';
import TimerInput from "./TimerInput";
import { Button } from "@mui/material";
import { Alarm, HourglassEmpty } from "@mui/icons-material";


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
  const [isTimerActive, setIsTimerActive] = React.useState<boolean>(false);
  const isValidTimeRange = (maxTime >= 0) && (minTime >= 0) && (maxTime - minTime >= 0);
  const [canButtonRipple, setCanButtonRipple] = React.useState<boolean>(true)

  const startTimer = () => {
    if (!isValidTimeRange || isTimerActive) { return; }
    const r = Math.random();
    const duration = Math.floor((maxTime - minTime)*r + minTime);
    setIsTimerActive(true);

    console.log(`Setting timer for ${duration} seconds!`)

    setTimeout(() => {
      setIsTimerActive(false);
      console.log(`Timer done! Total Duration was: ${duration}`)
    }, duration*1000);
  };

  React.useEffect(() => {
    if (isTimerActive)
      setTimeout(() => setCanButtonRipple(false), 1000);
    else
      setCanButtonRipple(true);
  }, [isTimerActive])


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
          disabled={!isValidTimeRange}
          onClick={() => startTimer()}
          disableRipple={!canButtonRipple}
        >
          {isTimerActive ? "Timer Active" : "Start Timer"}
        </Button>

      </div>
    </Themeing>
  );
};

export default App;