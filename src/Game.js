import React from 'react';
import logo from './logo.svg';
import './Game.css';

class Message extends React.Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Connect Four</h1>
        </header>
        <div className="message-board">
          <h2 className="message">{this.props.message}</h2>
          <button className="play-again" onClick={this.props.restart}>{this.props.buttonText}</button>
        </div>
      </div>
    );
  }
}

function Square(props) {
  return (
    <div className='square'>
      <div className={props.color}></div>
    </div>
  )
}

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.clickHandle(this.props.colId);
  }
  render() {
    return (
      <div className='column' onClick={this.handleClick}>
        <Square color={this.props.colors[5]} rowId={5} colId={this.props.colId}/>
        <Square color={this.props.colors[4]} rowId={4} colId={this.props.colId}/>
        <Square color={this.props.colors[3]} rowId={3} colId={this.props.colId}/>
        <Square color={this.props.colors[2]} rowId={2} colId={this.props.colId}/>
        <Square color={this.props.colors[1]} rowId={1} colId={this.props.colId}/>
        <Square color={this.props.colors[0]} rowId={0} colId={this.props.colId}/>
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [], [], [], [], [], [], []
      ],
      isRedNext: true,
      totalSteps: 0,
      buttonText: 'Start Over',
      gameState: true
    }
    this.clickHandle = this.clickHandle.bind(this);
  }

  clickHandle(colId) {
    if (this.state.board[colId].length < 6 && this.state.gameState === true && this.state.totalSteps < 42) {
      let newState = Object.assign({}, this.state);
      newState.board[colId].push((this.state.isRedNext === true) ? 'red' : 'black');
      newState.isRedNext = (this.state.isRedNext === true) ? false : true;
      newState.totalSteps = this.state.totalSteps + 1;
      this.setState((state) => {
        return newState;
      });
      if (calculateWin(this.state) === 'gameover') {
        let newState = Object.assign({}, this.state);
        newState.buttonText = 'Play again?';
        newState.gameState = false;
        this.setState((state) => {
          return newState;
        });
      }
    }
    if (this.state.totalSteps > 42) {
      let newState = Object.assign({}, this.state);
      newState.gameState = false;
      this.setState((state) => {
        return newState;
      });
    }
  }

  restart = () => {
    let newState = Object.assign({}, this.state);
    newState.board = [
      [], [], [], [], [], [], []
    ];
    newState.isRedNext = true;
    newState.totalSteps = 0;
    newState.buttonText = 'Start Over';
    newState.gameState = true;
    this.setState((state) => {
      return newState;
    });
  }

  render() {
    let whoNext = (this.state.isRedNext === true) ? 'Red' : 'Black';
    let message = (this.state.gameState === true) ? (whoNext + "'s turn") : (whoNext + ' wins!');
    if (this.state.totalSteps === 42) {
      message = "No winner";
    }
    return (
      <div>
        <Message restart={this.restart} buttonText={this.state.buttonText} 
        message={message}/>
        <div id='board'>
          <Column colors={this.state.board[0]} colId={0} clickHandle={this.clickHandle}/>
          <Column colors={this.state.board[1]} colId={1} clickHandle={this.clickHandle}/>
          <Column colors={this.state.board[2]} colId={2} clickHandle={this.clickHandle}/>
          <Column colors={this.state.board[3]} colId={3} clickHandle={this.clickHandle}/>
          <Column colors={this.state.board[4]} colId={4} clickHandle={this.clickHandle}/>
          <Column colors={this.state.board[5]} colId={5} clickHandle={this.clickHandle}/>
          <Column colors={this.state.board[6]} colId={6} clickHandle={this.clickHandle}/>
        </div>
      </div>
    );
  }
}

export const calculateWin = (currentState) => {
  let board = currentState.board;
  for (let i = 0; i < 7; i++) { // i = column
    for (let j = 0; j < 6; j++) { // j = row
      if ((j < 3 && board[i][j] !== undefined && board[i][j] === board[i][j+1] && board[i][j] === board[i][j+2] && board[i][j] === board[i][j+3]) ||
          (i < 4 && board[i][j] !== undefined && board[i][j] === board[i+1][j] && board[i][j] === board[i+2][j] && board[i][j] === board[i+3][j]) ||
          (i < 4 && j < 3 && board[i][j] !== undefined && board[i][j] === board[i+1][j+1] && board[i][j] === board[i+2][j+2] && board[i][j] === board[i+3][j+3]) ||
          (i > 2 && j < 3 && board[i][j] !== undefined && board[i][j] === board[i-1][j+1] && board[i][j] === board[i-2][j+2] && board[i][j] === board[i-3][j+3])) {
        return "gameover";
      }
    }
  }
}

export default Board;

