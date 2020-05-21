import React from 'react'

import './Done.css'
/**
* @author
* @function 
**/

const Done = (props) => {
    // passing the status to the onDRop function to specify where div needs to be dropped 
    // for ex we want to drop in Doing block
    return (
        <div className="doneContainer"
            onDragOver={(e) => props.onDragOver(e)}
            onDrop={(e) => props.onDrop(e, "Done")}>
            <span className="task-header">Done</span>
            {props.tasks}
        </div>
    )

}

export default Done;