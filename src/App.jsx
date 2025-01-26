import React, { useState } from "react";
import Display from "./components/Display";
import ButtonsContainer from "./components/ButtonsContainer";
import styles from "./App.module.css";

function App() {
  const [currentInput, setCurrentInput] = useState(""); // Full expression displayed
  const [previousInput, setPreviousInput] = useState(null); // To store the previous number
  const [operation, setOperation] = useState(null); // To track the current operation

  const handleButtonClick = (buttonName) => {
    if (!isNaN(buttonName) || buttonName === ".") {
      // If the button is a number or decimal point
      setCurrentInput((prev) => prev + buttonName);
    } else if (["+", "-", "*", "/"].includes(buttonName)) {
      // If the button is an operation
      if (currentInput && !operation) {
        setCurrentInput((prev) => prev + buttonName);
        setPreviousInput(currentInput);
        setOperation(buttonName);
      }
    } else if (buttonName === "=") {
      // Calculate the result
      if (currentInput && previousInput && operation) {
        const [num1, num2] = [parseFloat(previousInput), parseFloat(currentInput.split(operation).pop())];
        const result = calculate(num1, num2, operation);
        setCurrentInput(result.toString());
        setPreviousInput(null);
        setOperation(null);
      }
    } else if (buttonName === "c") {
      // Clear all inputs
      setCurrentInput("");
      setPreviousInput(null);
      setOperation(null);
    }
  };

  const calculate = (num1, num2, operation) => {
    switch (operation) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num2 !== 0 ? num1 / num2 : "Error"; // Prevent division by zero
      default:
        return 0;
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>Calculator</header>
      <div className={styles.calculator}>
        <Display value={currentInput} />
        <ButtonsContainer onButtonClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
