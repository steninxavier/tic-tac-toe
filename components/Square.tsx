import React from 'react'
type Player = 'X' | 'O' | 'BOTH' | null;

const Square = ({value,onClick,winner}:{
  value: Player
  winner: Player
  onClick: ()=>void
}) => {
  if(!value){
    return  <button className='square' onClick={onClick} disabled={Boolean(winner)}/>
  }
  return (<div>
 <button disabled className={` square square_${value.toLocaleLowerCase()}`}>{value}</button>
 </div>
  )
}
 
export default Square