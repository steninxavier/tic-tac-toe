import React, { useEffect, useState } from 'react'
import Square from './Square';

type Player = 'X' | 'O' | 'BOTH'| null;

const Board = () => {
const[squares,setSquares]= useState(Array(9).fill(null));
const[currentPlayer,setCurrentPlayer] = useState<'O' | 'X'>(
    Math.round(Math.random() * 1) === 1 ? 'X' : 'O'
)
const [winner,setWinner]= useState<Player>(null)
function setValues(index:number){
    const newData= squares.map((value,i)=>{
      if(i===index){
        return currentPlayer
      }
      return value
    })
    setSquares(newData)
    setCurrentPlayer(currentPlayer==='X'? 'O':'X')
}

function reset(){
  setSquares(Array(9).fill(null))
  setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O')
  setWinner(null)
}


function calculateWinner(squares:Player[]){
  const lines= [[0,1,2],[3,4,5],[6,7,8], [0,3,6],  [1,4,7],  [2,5,8],  [0,4,8], [6,4,2]]
for(let i=0;i<lines.length;i++){
const[a,b,c]= lines[i];
if(squares[a] &&squares[a]===squares[b]&&squares[a]===squares[c]){
  return squares[a]
}
}
return null
}
useEffect(()=>{
  const w = calculateWinner(squares)
  if (w){
     return setWinner(w)
  }
  if(!w && !squares.filter((square)=> !square).length){
    return setWinner('BOTH')
  }
})

  return (<div>   
      {!winner &&  <h2>Hey {currentPlayer} , it is your turn</h2>}
      {winner && winner!== 'BOTH' && <h2>Congratulations {winner}</h2>}
      {winner && winner==='BOTH' && <h2>Congratulations both of you</h2>}
      <div className='grid'>
      {Array(9)
          .fill(null)
          .map((_, i) =>(
              <Square
                winner={winner}
                key={i}
                onClick={() => setValues(i)}
                value={squares[i]}
              />
            )
          )}
  </div>
  <button onClick={reset} className='reset'>RESET</button>
    </div>
  )
}

export default Board