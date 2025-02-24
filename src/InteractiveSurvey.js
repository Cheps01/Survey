import "./styles.css";
import { useState } from "react";
import {
  Container,
  Input,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Alert,
} from "@mui/material";

function ProgressBar({ progress }) {
  return (
    <>
      <LinearProgress variant="determinate" value={progress} />
    </>
  );
}

function TextInput({ id, type, placeholder, input, onInput, onProgress }) {
  const [firstChange, setFirstChange] = useState(true);
  function handleChange(event) {
    onInput(event);
    if (firstChange) {
      onProgress(25);
      setFirstChange(false);
    }
    if (event.target.value === "") {
      setFirstChange(true);
      onProgress(-25);
    }
  }
  return (
    <div style={{ margin: "8px 10vw" }}>
      <TextField
        id={id}
        fullWidth
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={input}
      ></TextField>
    </div>
  );
}
function Select({ input, onInput, onProgress }) {
  const [firstChange, setFirstChange] = useState(true);
  function handleChange(event) {
    onInput(event);
    if (firstChange) {
      onProgress(25);
      setFirstChange(false);
    }
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <RadioGroup value={input} onChange={handleChange}>
        <div>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </div>
      </RadioGroup>
    </div>
  );
}

function Feedback({ show, type, message }) {
  return (
    <>
      <Alert style={{ display: show ? "flex" : "none" }} severity={type}>
        {message}
      </Alert>
    </>
  );
}

export default function InteractiveSurvey() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  function handleInput(event) {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }
  function handleProgress(change) {
    let value = progress + change;
    setProgress(value);
  }
  function clearInputs() {
    setFormData({ ...formData, name: "", email: "", age: "" });
  }
  function displayAlert(type, msg) {
    setShowAlert(true);
    setAlertType(type);
    setMessage(msg);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const validName = /^[A-Za-z]+$/;
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (progress < 100) {
      displayAlert("info", "Complete the survey before submiting.");
    } else if (!validName.test(formData.name)) {
      displayAlert("warning", "Not valid name. It must have only letters.");
    } else if (!validEmail.test(formData.email)) {
      displayAlert(
        "warning",
        "Not valid email. Make sure the email address exists."
      );
    } else {
      displayAlert("success", "Success! Data has been validated");
      clearInputs();
      handleProgress(-100);
    }
  }
  return (
    <div className="App">
      <Container>
        <h1>Interactive Survey</h1>
        <ProgressBar progress={progress} />
        <form onSubmit={handleSubmit}>
          <TextInput
            id={"name"}
            type={"text"}
            placeholder={"Name"}
            input={formData.name}
            onInput={handleInput}
            onProgress={handleProgress}
          />
          <TextInput
            id={"email"}
            type={"email"}
            placeholder={"Email"}
            input={formData.email}
            onInput={handleInput}
            onProgress={handleProgress}
          />
          <TextInput
            id={"age"}
            type={"number"}
            placeholder={"Age"}
            input={formData.age}
            onInput={handleInput}
            onProgress={handleProgress}
          />
          <Select
            input={formData.gender}
            onInput={handleInput}
            onProgress={handleProgress}
          />
          <Feedback show={showAlert} type={alertType} message={message} />
          <div>
            <Input id="submit" type="submit" variant="contained"></Input>
          </div>
        </form>
      </Container>
    </div>
  );
}
