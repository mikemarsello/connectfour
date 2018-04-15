import React, { Component } from 'react';
import { calculateWin } from './calculateWin.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Connect Four</h1>
        </header>
        <div id="message"></div>
        <Board />
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      turn: 'red',
      total: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (id, turn) => {
    if (this.state[id].length < 6) {
      let newState = Object.assign({}, this.state);
      newState[id].push(this.state.turn);
      let nextTurn = (this.state.turn === 'red') ? 'black' : 'red';
      newState.turn = nextTurn;
      let newTotal = this.state.total + 1;
      newState.total = newTotal;
      this.setState((state) => {
        return newState;
      });
      if (this.state.total === 41) {
        alert("Game over - no winner");
      }
    }
    else {
      alert("That column is full, please try again");
    }
  }

  componentDidUpdate = () => calculateWin(this.state);

  render() {
    let columns = [];
    for (let i = 0; i < 7; i++) {
      columns.push(<Column colors={this.state} id={i} key={i} handleClick={this.handleClick} />);
    }
    return (
      <div id="board">
        {columns}
      </div>
    );
  }
}

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler() {
    this.props.handleClick(this.props.id, this.props.nextColor);
  }
  render() {
    let cells = [];
    for (let i = 5; i >= 0; i--) {
      cells.push(<Cell colors={this.props.colors[this.props.id][i]} rowId={i} key={i} colId={this.props.id} />)
    }
    return (
      <div className="column" onClick={this.clickHandler}>
        {cells}
      </div>
    );
  }
}

class Cell extends React.Component {
  // {this.props.colId}, {this.props.rowId}
  render() {
    return (
      <div className="cell">
        <div className={this.props.colors}>
        </div>
      </div>
    );
  }
}

export default App;