import React from 'react'
import './Todo.css';

/**
* @author
* @function 
**/

const Todo = (props) => {
    return (
        <div className="todoContainer"
            onDragOver={(e) => props.onDragOver(e)}
            onDrop={(e) => { props.onDrop(e, "Todo") }}>
            <span className="task-header">Todo</span>
            <form onSubmit={props.handleSubmit} >
                <h3>Add Card with Your Desired status ie:Todo or Doing or Done as written</h3>
                <div>
                    <input type="text" placeholder="Your Todo" name="name" value={props.value} onChange={props.handleInput} />
                    <input type="text" placeholder="ie:'Todo'or'Doing'or'Done'" name="status" value={props.value1} onChange={props.handleInput} />
                </div>
                <button type="submit">add</button>


            </form>
            {props.tasks}
        </div>
    )

}

export default Todo;