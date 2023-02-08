import { useCallback, useContext } from "react";
import { PlayerContext } from "./board";

export default function Cell({value, playerSymbol, setCells}) {
    const {player, setPlayer} = useContext(PlayerContext);
    // console.log('render cell', value);

    const setPlayerSymbol = useCallback((e) => {
        if (!playerSymbol) {
            // setSymbol(player);
        
            setCells({type: player, value: value});
            if(player === 'X') {
                setPlayer('O');
            } else {
                setPlayer('X');
            }
        }
    }, [player, setPlayer, setCells, playerSymbol, value]); 
    return (
        <>
            <div className="board-cell" value={value} onClick={setPlayerSymbol}>{playerSymbol}</div>
        </>
    );
}