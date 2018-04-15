import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

class Victory extends React.Component {
  render() {
    return (
      <div>
        <div className="victory-board">
          <h2 className="victory-message">{this.props.winner} wins!</h2>
          <button className="play-again">Play again?</button>
        </div>
      </div>
    );
  }
}

export const calculateWin = (board) => {
  let winner = 'red';
  if (board.turn === 'red') {
    winner = 'black';
  }
  for (let i = 0; i < 7; i++) { // i = column
    for (let j = 0; j < 6; j++) { // j = row
      if (j < 3) {
        if (board[i][j] !== undefined && board[i][j] === board[i][j+1] && board[i][j] === board[i][j+2] && board[i][j] === board[i][j+3]) {
          ReactDOM.render(<Victory winner={winner}/>, document.getElementById('message'));
          registerServiceWorker();
        }
      }
      if (i < 4) {
        if (board[i][j] !== undefined && board[i][j] === board[i+1][j] && board[i][j] === board[i+2][j] && board[i][j] === board[i+3][j]) {
          ReactDOM.render(<Victory winner={winner}/>, document.getElementById('message'));
          registerServiceWorker();
        }
      }
      if (i < 4 && j < 3) {
        if (board[i][j] !== undefined && board[i][j] === board[i+1][j+1] && board[i][j] === board[i+2][j+2] && board[i][j] === board[i+3][j+3]) {
          ReactDOM.render(<Victory winner={winner}/>, document.getElementById('message'));
          registerServiceWorker();
        }
      }
      if (i > 2 && j < 3) {
        if (board[i][j] !== undefined && board[i][j] === board[i-1][j+1] && board[i][j] === board[i-2][j+2] && board[i][j] === board[i-3][j+3]) {
          ReactDOM.render(<Victory winner={winner}/>, document.getElementById('message'));
          registerServiceWorker();
        }
      }
    }
  }
}
