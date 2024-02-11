import './App.css';
import {useState} from "react";

 // TO DO
 //For the current move only, show “You are at move #…” instead of a button.
 //Rewrite Board to use two loops to make the squares instead of hardcoding them.
 //Add a toggle button that lets you sort the moves in either ascending or descending order.
 //When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
 //Display the location for each move in the format (row, col) in the move history list.
export default function Game (){

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove,setCurrentMove] = useState((0));
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;
    function handlePlay(nextSquares){
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);

    }

    const moves = history.map((squares, move) => {
        let description;
        if (move === currentMove){
            if(move>0) {
                description = 'You are at move #' + move;
            }else {
                description = 'start the game';
            }
            return (
                <li key={move}>
                    <div className="current-move">{description}</div>
                </li>);
        } else {
            if (move > 0) {
                description = 'Go to move #' + move;
            } else {
                description = 'Go to game start';
            }
             return (
               <li key={move}>
                   <button onClick={() => jumpTo(move)}>{description}</button>
               </li>
             );
      }
    });
    return(
        <div className="game">
            <div className="game-board">
                <Board squares={currentSquares} onplay={handlePlay} xTurn={xIsNext}/>
            </div>
            <div className="game-info">
                <ol>{moves}
                </ol>
            </div>
        </div>
    );
}

function Board({xTurn,squares,onplay}) {
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if(xTurn) {
            nextSquares[i] = "X";
        }else {
            nextSquares[i]="O"
        }
        onplay(nextSquares);

    }
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xTurn ? "X" : "O");
    }
    const boardInit =()=>{
        let board =[];
        for (var j=0;j<3;j++) {
            let br =[];
            for (var k=0;k<3;k++){
                let f=3*j+k;
            br.push( <Square value={squares[f]} handleClick={() => handleClick(f)}/>);
             }
               board.push(
                   <div className="board-row">
                       {br}
                   </div>
               );
        }
        return(board);

    }
    return (
        <>
            <div className="status">{status}</div>
            <div className="board">{boardInit()}</div>

        </>
    );
}

function Square({value, handleClick}) {

    return (
        <button onClick={handleClick} className="square">{value}</button>
    );
}
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

