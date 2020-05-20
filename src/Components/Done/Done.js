import React from 'react'

import './Done.css'
/**
* @author
* @function 
**/

const  Done= (props) => {
  return(
    <div className="doneContainer"
    onDragOver={(e) => props.onDragOver(e)}
    onDrop={(e) => props.onDrop(e, "Done")}>
    <span className="task-header">Done</span>
    {props.tasks}
  </div>
   )

 }

export default Done;