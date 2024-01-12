import { Box, Paper, styled, useTheme } from "@mui/material";
import styles from "@css/TimerInput.module.css";
import React from "react";
import TimerField from "./TimerField";


const TimerPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  rowGap: theme.spacing(1),
  ...theme.typography.body2,
  flex: 1
}));


interface TimerInputProps {
  label: string;
  timeSeconds: number;
  setTimeSeconds: React.Dispatch<React.SetStateAction<number>>;
};


const TimerInput: React.FC<TimerInputProps> = ({ label, timeSeconds, setTimeSeconds}) => {
  const theme = useTheme();
  const errorStyles = { "color": theme.palette.error[theme.palette.mode]};
  const [errorMesage, setErrorMessage] = React.useState("");

  const hours = Math.floor(timeSeconds / 3600);
  const minutes = Math.floor((timeSeconds - hours*3600) / 60);
  const seconds = Math.floor(timeSeconds - hours*3600 - minutes*60);

  const convertToSeconds = (h: number, m: number, s: number) => {
    const newTimeSeconds = h*3600 + m*60 + s;
    setTimeSeconds(newTimeSeconds);
  };

  const displayErrorMessage = (msgToDisplay: string) => {
    setErrorMessage(msgToDisplay);
    setTimeout(() => setErrorMessage(""), 3000);
  };

  return (
    <div className="">
      <TimerPaper elevation={1} >
        {label}
        <div className={styles.container}>
          <TimerField label="Hours" value={hours} validRange={[0,24]}
            onChange={(newVal) => convertToSeconds(newVal, minutes, seconds)}
            displayError={displayErrorMessage}
          />
          <TimerField label="Minutes" value={minutes} validRange={[0,60]}
            onChange={(newVal) => convertToSeconds(hours, newVal, seconds)}
            displayError={displayErrorMessage}
          />
          <TimerField label="Seconds" value={seconds} validRange={[0,60]}
            onChange={(newVal) => convertToSeconds(hours, minutes, newVal)}
            displayError={displayErrorMessage}
          />
        </div>
        <div style={errorStyles}>{errorMesage}</div>
      </TimerPaper>
    </div>
  );
};



export default TimerInput;