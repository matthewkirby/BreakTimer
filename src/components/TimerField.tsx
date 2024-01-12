import { TextField } from "@mui/material";
import React from "react";

interface TimerFieldProps {
  label: string;
  value: number;
  validRange: [number, number];
  onChange: (newVal: number) => void;
  displayError: (msgToDisplay: string) => void;
}

const TimerField: React.FC<TimerFieldProps> = ({ label, value, validRange, onChange, displayError }) => {
  // const [hasError, setHasError] = React.useState<boolean>(false);

  const validateOnChange = (newVal: string) => {
    const newNumber = parseInt(newVal);
    if (isNaN(newNumber) || newNumber < validRange[0] || newNumber > validRange[1]) {
      displayError(`${label} must be between ${validRange[0]} and ${validRange[1]}`);
      return 0;
    }
    return newNumber;
  };


  return (
    <TextField
      label={label}
      variant="outlined"
      style={{ "width": "75px" }}
      InputLabelProps={{
        shrink: true
      }}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(validateOnChange(e.target.value))}
      //@ts-ignore
      onClick={(e: React.MouseEvent<HTMLInputElement>) => e.target.select()}
    />
  )
};

export default TimerField;