import React, { Component } from 'react';
import './App.css';
import Done from './Components/Done/Done'
import Doing from './Components/Doing/Doing'
import Todo from './Components/Todo/Todo'

export default class AppDragDropDemo extends Component {
  // Giving 3 default values for name and status

  state = {
    tasks: [
      { name: "React(default Todo with default status)", status: "Todo" },
      { name: "Node(default Todo with default status)", status: "Doing" },
      { name: "Engineeringhuh(default Todo with default status)", status: "Done" }
    ],
    items: {
      name: '',
      status: ''
    }
  }
  // Handling the input change event for adding new draggable items
  handleInput = (event) => {
    event.preventDefault();
    let items = this.state.items;
    let name = event.target.name;
    let value = event.target.value;

    items[name] = value;

    this.setState({ items: items })


  }

  // HAndling the onSubmit listener and updating the tasks array accordingly 
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.items);
    const newItem = this.state.items;
    const tasks = [...this.state.tasks, newItem]
    this.setState({
      tasks: tasks,
      items:
      {
        name: '',
        status: ''
      }
    })
  }

  // using the onDragStart event to get the current element being dragged so that we can use that data to 
  // match and drop successfully
  onDragStart = (ev, id) => {
    console.log('dragstart:', id);
    ev.dataTransfer.setData("id", id);
  }
  // to make any div droppable we use onDragOver
  onDragOver = (ev) => {
    ev.preventDefault();
  }


  // This onDrop method is responsible for the actual element being dropped into another div by updating
  // status currently
  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let tasks = this.state.tasks.filter((task) => {
      if (task.name == id) {
        task.status = cat;
      }
      return task;
    });

    // updating the tasks array by taking the comlete state and replacing it with the new array
    this.setState({
      ...this.state,
      tasks
    });
  }


  render() {
    // using separate arrays to store items according to there respective  statuses
    var tasks = {
      Todo: [],
      Doing: [],
      Done: [],
    }
    // using for each loop to store the div in the respective arrays according to there status,and 
    // using the name value assuming it to be unique 
    // Note we can also use id for a real project
    // setting draggable to true to make the div draggable
    this.state.tasks.forEach((tsk) => {
      tasks[tsk.status].push(
        <div key={tsk.name}
          onDragStart={(e) => this.onDragStart(e, tsk.name)}
          draggable
          className="draggable">
          {tsk.name}
        </div>
      );
    });


    return (
      // rendering our divs by making there separate components and using the status property to make the actual drop happen 

      <div>
        <h1 className='header'>Kanban Board</h1>
        <div className="container-drag">
          <Todo onDragOver={this.onDragOver} onDrop={this.onDrop} tasks={tasks.Todo}
            handleSubmit={this.handleSubmit}
            handleInput={this.handleInput}
            value={this.state.items["name"]}
            value1={this.state.items["status"]}
          />
          <Doing onDragOver={this.onDragOver} onDrop={this.onDrop} tasks={tasks.Doing} />
          <Done onDragOver={this.onDragOver} onDrop={this.onDrop} tasks={tasks.Done} />
        </div>
      </div>
    );
  }
}

// Also we pass the OnDragOver Event and onDrop event so that every block becomes droppable and
// gets  the actual drop happening  
