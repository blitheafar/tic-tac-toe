import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//判断胜者
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

//组件Square
function Square(props) {
    return(
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
    );
}

//组件Board
class Board extends React.Component {
    constructor(props){
        super(props);
        this.state={
            //设置长度为9的空值数组
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

handleClick(i){
    const squares=this.state.squares.slice();
    //游戏结束，不继续
    if (calculateWinner(squares)||squares[i]) {
        return;
    }
    //反转玩家状态
    squares[i]=this.state.xIsNext?'X':'O';
    this.setState({squares: squares,xIsNext: !this.state.xIsNext});
}

  renderSquare(i) {
    return (
    <Square
    value={this.state.squares[i]}
    onClick={()=>this.handleClick(i)}
    />
    );
  }

  render() {
    //下棋提示
    //const status = 'Next player: '+(this.state.xIsNext?'X':'O');

    const winner= calculateWinner(this.state.squares);
    let status;
    if (winner) {
        status='Winner: '+winner;
    }else{
        status='Next player:'+(this.state.xIsNext?'X':'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

//组件Game
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
