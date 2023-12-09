import React from 'react';

function Dropdown() {
    const [clicked,setclicked] = React.useState(false);
    const [pdrop,setpdrop] = React.useState(false);

  return (
    <div className='display'>
       {
        clicked ? 
        (<h1  className="button-button items" onClick={()=>{setclicked(true); setpdrop(!pdrop)}} sx={{color: 'orange', fontSize: 36}}  >hello</h1>) : 
        (<h1  onClick={()=>{setclicked(!clicked);}} className="button-clicked">bye</h1>)
       }
       {pdrop && <h1>qwerty</h1>}
    </div>
  )
}

export default Dropdown;