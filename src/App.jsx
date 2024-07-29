import "bootstrap/dist/css/bootstrap.min.css";
import Button from "./components/button/button";
import { useState } from "react";
import { evaluate } from 'mathjs'
// import { atan2, chain, derivative, e, log, pi, pow, round, sqrt } from 'mathjs'

import "./App.css";


function App() {
  const numberButtons = ["Ac","⌫", "/", "%", "7", "8", "9", "*", "4", "5", "6","-", "1", "2", "3", "+", "+/-", "0", ".", "="];

  let [inputValue, setInputValue] = useState('0')
  let [inputMemValue, setInputMemValue] = useState('')
  let [operator, setOperator] = useState('')

  let [operatorNum1, setOperatorNum1] = useState('')
  let [operatorNum2, setOperatorNum2] = useState('')
  
  let [active, setActive] = useState('');



/*
  function isNumber(value) {
    return !isNaN(value);
  }
*/

  const calFunctionality = (label) => {
  
    switch(label) {
      case "0":      case "1":      case "2":      case "3":      case "4":      case "5":
      case "6":      case "7":      case "8":      case "9":      
      if(inputValue.slice(0, 1) === "="){
        globalReset()
        setInputValue(label)
      }
      else{
        let input = inputValue === "0" ? '' : inputValue
        input += label
        setInputValue(input)
        }
      break

      case ".":
        if(inputValue.slice(-1) === "." || inputValue.slice(0, 1) === "=") {} 
        else {
          console.log(inputValue.slice(-1))
          inputValue += label
          setInputValue(inputValue)
        }
      break

      case "Ac":
        globalReset()
      break

      case "+":      case "-":      case "*":      case "/":      case "%":
        setActive(label)
        if(inputValue.slice(0, 1) === "=") {
          operatorNum1 = inputValue.slice(1)
        } if(inputMemValue !== '') {
          setInputMemValue(operatorNum1 + ' ' + label)
          setOperatorNum2(inputValue)
        } else {
          operatorNum1 = inputValue
        }
        
        setOperatorNum1(operatorNum1)
        setOperator(label)
        setInputMemValue(operatorNum1 + ' ' + label)
        setInputValue('0')
      break

      case "⌫":
        if(inputValue.slice(0, 1) === "=") {} 
        else {
          let inputLength = inputValue.length
          let eraseNumber = inputValue.slice(0, inputLength - 1)
          if (inputLength > 1) {
            inputValue = eraseNumber
            setInputValue(eraseNumber)
          } else {
            setInputValue('0')
          }
        }
      
      break

      case "+/-":
        if(inputValue.slice(0, 1) === "=") {} 
        else {
          let positiveNegative = inputValue.slice(0, 1)
          if (positiveNegative !== "-") {
           setInputValue("-" + inputValue)
           } else { 
          setInputValue(inputValue.slice(1))
          }
        }
      break

      case "=":
        if(inputValue.slice(0, 1) === "=") {} 
        else { 
        operatorNum2 = inputValue
        setInputMemValue(inputMemValue + ' ' + operatorNum2)

        let equal = evaluate(operatorNum1 + operator + operatorNum2)
        setInputValue("="+ equal)
        setActive('')
        }
      break

    }
  }

    function globalReset(){
      setInputValue('0')
      setInputMemValue('')
      setOperatorNum1('')
      setOperatorNum2('')
      setOperator('')
      setActive('')
    }
  




  return (
    <>
      <div className="container">
          <div id="circle" className="mx-xl-5"></div>
        <div className="row d-flex justify-content-center m-0" id>
          <div className="col-12 col-md-7 col-lg-6 col-xl-4">
            <div id="calculator" className="container py-5 px-4">
              <div className="mx-3">

              <div className="row my-5">
                <input className="" type="text" value={inputMemValue} disabled />
                <input className="" type="text" value={inputValue} disabled />
              </div>

              <div className="row">

              {numberButtons.map((button) => (
                  <Button onClicked={calFunctionality} label={button} key={button} isOperator={active === button} isResult={button === '='}/>
                ))}

              </div>
              </div>
        
  
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
