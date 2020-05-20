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
      { name: "Engineering(default Todo with default status)", status: "Done" }
    ],
    items: {
      name: '',
      status: ''
    }
  }

  handleInput = (event) => {
    event.preventDefault();
    let items = this.state.items;
    let name = event.target.name;
    let value = event.target.value;

    items[name] = value;

    this.setState({ items: items })


  }


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

  onDragStart = (ev, id) => {
    console.log('dragstart:', id);
    ev.dataTransfer.setData("id", id);
  }

  onDragOver = (ev) => {
    ev.preventDefault();
  }

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let tasks = this.state.tasks.filter((task) => {
      if (task.name == id) {
        task.status = cat;
      }
      return task;
    });

    this.setState({
      ...this.state,
      tasks
    });
  }


  render() {
    var tasks = {
      Todo: [],
      Doing: [],
      Done: [],
    }

    this.state.tasks.forEach((t) => {
      tasks[t.status].push(
        <div key={t.name}
          onDragStart={(e) => this.onDragStart(e, t.name)}
          draggable
          className="draggable">
          {t.name}
        </div>
      );
    });

    return (
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