import React, { Component } from 'react';
import DigitItem from "./components/digit-item";
import './App.css';

class App extends Component {
  state = { numberInput: "", randomNumber: -1 };

  flip() {
    return Math.random() >= 0.5;
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
    if (this.state.randomNumber >= 0) {
      numberCard = (
        <DigitItem
          numberMeaning="Random Number"
          number={this.state.randomNumber}
        />
      );
    }
    return (
      <div className="flex-container">
        <form
          onSubmit={e => {
            e.preventDefault();
            this.randomNumber(this.state.numberInput);
          }}
        >
          <label>Number: </label>
          <input
            value={this.state.numberInput}
            onChange={e => {
              let newValue = e.target.value.replace(/[a-z]/gi, "");
              newValue = Number(newValue);
              if (newValue > 1000000) {
                this.setState({ randomNumber: -1 });
                throw Error;
              }
              this.setState({ numberInput: newValue });
            }}
          />
          <button>Generate</button>
        </form>
        {numberCard}
      </div>
    );
  }
}

export default App;
