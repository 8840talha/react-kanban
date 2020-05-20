import React from 'react'
import './Doing.css';

const  Doing = (props) => {
  return(
    <div className="doingContainer"
    onDragOver={(e) => props.onDragOver(e)}
    onDrop={(e) => props.onDrop(e, "Doing")}>
    <span className="task-header">Doing</span>
    {props.tasks}
  </div>
   )

 }

export default Doing;