import React, {Component} from 'react';
import './Game.css';

const Cell_Size = 20;
const Width = 800;
const Height = 600;

class Cell extends Component {
    render() {
        const { x,y } = this.props; // Object destructuring
        return (
          <div className="Cell" style={{
              left: `${Cell_Size * x + 1}px`,
              top: `${Cell_Size * y + 1}px`,
              width: `${Cell_Size - 1}px`,
              height: `${Cell_Size -1}px`
          }} />
        );
    }
}

class Game extends Component {
    constructor() {
        super();
        this.rows = Height / Cell_Size;
        this.cols = Width / Cell_Size;
        this.board = this.makeEmptyBoard();
        console.log(this);
    }

    state = {
        cells: []
    }

    makeEmptyBoard() {
        let board = [];
        for(let y = 0; y < this.rows; y++){
            board[y] = [];
            for(let x = 0; x < this.cols; x++){
                board[y][x] = false;
            }
        }
        return board;
    }

    makeCells() {
        let cells = [];
        for(let y = 0; y< this.rows; y++) {
            for(let x = 0; x< this.cols; x++) {
                if(this.board[y][x]) {
                    cells.push({ x,y })
                }
            }
        }
        return cells;
    }

    getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect(); // "getBoundingClientRect" : returns the size of an element and its position relative to the viewport.
        const doc = document.documentElement; // "document.documentElement" : returns element <HTML>.

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft, // "clientLeft" : gets the width of a <div> element's top and left border.
            y: (rect.top + window.pageYOffset) - doc.clientTop
        };
    }

    handleClick = (event) => {
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;

        const x = Math.floor(offsetX / Cell_Size);
        const y = Math.floor(offsetY / Cell_Size);

        if(x >= 0 && x <= this.cols && y>= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({cells: this.makeCells()});
        console.log(this.state);
    }


    render() {
        const { cells } = this.state;
        return(
            <div>
                <div className="Board"
                     style={{width: Width, height: Height,
                     backgroundSize: `${Cell_Size}px ${Cell_Size}px`}}
                    onClick={this.handleClick}
                    ref={(n) => {this.boardRef = n; }}>
                </div>
            </div>
        );
    }
}

export default Game;
