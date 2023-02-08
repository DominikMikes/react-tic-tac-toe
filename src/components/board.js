import { createContext, useCallback, useLayoutEffect, useReducer, useState } from 'react';
import './board.css';
import Cell from './cell';

const rows = 3;
export const PlayerContext = createContext();

function fillCells(state, action) {
    if (action.type === 'reset') {
        state = [];
    } else {
        state[action.value] = action.type;
    }
    
    return state;
}

function checkWinner(cells) {
    if (cells.length >= 5 ) {
        const combs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6] 
        ];

        for (let comb of combs) {
            if (
                cells[comb[0]] === cells[comb[1]] 
                    && 
                cells[comb[1]] === cells[comb[2]] 
                    && 
                cells[comb[0]] !== '' && cells[comb[0]]
            ) {
                return `Winner is ${cells[comb[0]]}`;
            }
        }
    } else if (cells.length >= 9) {
        return 'Draw';
    }
    return false;
}

export default function Board() {
    const [player, setPlayer] = useState('X');
    const [cells, setCells] = useReducer(fillCells, []);
    const [winner, setWinner] = useState(false);

    useLayoutEffect(() => {
        setWinner(checkWinner(cells));
    }, [cells, player]);
    
    function renderRows() {
        let rowElements = [];
        let cellCnt = 0;
        for (let i=0; i < rows; i++) {
            rowElements.push(<div key={'row' + i} className="board-row">
                                <Cell key={i + 0} playerSymbol={cells[cellCnt]} value={cellCnt++} setCells={setCells}></Cell>
                                <Cell key={i + 1} playerSymbol={cells[cellCnt]} value={cellCnt++} setCells={setCells}></Cell>
                                <Cell key={i + 2} playerSymbol={cells[cellCnt]} value={cellCnt++} setCells={setCells}></Cell>
                            </div>);
        }

        return rowElements;
    }

    const resetGame = useCallback(() => {
        setCells([]);
        setWinner(false);
        setCells({type: 'reset'});
    }, [setWinner]);

    return(
        <>
            <PlayerContext.Provider value={{player, setPlayer}}>
                {renderRows()}
                {winner &&
                <div>
                    {winner} <button onClick={resetGame}>Reset</button>
                </div>
                }
            </PlayerContext.Provider>
        </>
    )
}