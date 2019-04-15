import React, { Component } from 'react';
import DigitItem from "./components/digit-item";
import ErrorMessage from "./components/error-message";
import './App.css';

const MAX_NUMBER = 1000000;

class App extends Component {
  state = {
    numberInput: "",
    randomNumber: -1,
    error: false
  };

  flip() {
    return Math.random() >= 0.5;
  }

  onInputNumberChange(e) {
    let newValue = e.target.value.replace(/[a-z]/gi, "");
    newValue = Number(newValue);
    if (newValue > MAX_NUMBER) {
      this.setState({
        error: true,
        numberInput: newValue,
        randomNumber: -1
      });
    }
    else {
        this.setState({ numberInput: newValue, error: false });
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    if(!this.state.error) {
        this.randomNumber(this.state.numberInput);
    }
    else {
      throw Error;
    }
  }

  randomNumber(n) {
    let randomNumber = 0;
    do {
      let currentDate = new Date();
      const lastDigit = currentDate.getMilliseconds() % 10;
      const result1 = randomNumber + lastDigit;
      const result2 = randomNumber * lastDigit;
      let result3;

      if (result1 < n && result2 < n) {
        randomNumber = result1 < result2 ? result2 : result1;
      } else if (result1 < n) {
        randomNumber = result1;
      } else if (result2 < n) {
        randomNumber = result2;
      }

      result3 = Math.pow(randomNumber, lastDigit);
      if (result3 < n && result3 > 0) {
        randomNumber = result3;
      }
    } while (this.flip());
    this.setState({ randomNumber });
  }

  render() {
    let numberCard = null;
    let errorMessage = null;
    if (this.state.randomNumber >= 0 && !this.state.error) {
      numberCard = (
        <DigitItem
          numberMeaning="Random Number"
          number={this.state.randomNumber}
        />
      );
    }
    else if(this.state.error) {
      errorMessage = <ErrorMessage maxNumber={MAX_NUMBER} />
    }

    return (
      <div className="flex-container">
        <form
          onSubmit={this.onFormSubmit.bind(this)}
        >
          <label>Number: </label>
          <input
            value={this.state.numberInput}
            onChange={this.onInputNumberChange.bind(this)}
          />
          <button>Generate</button>
        </form>
        {errorMessage}
        {numberCard}
      </div>
    );
  }
}

export default App;
