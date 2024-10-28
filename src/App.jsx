import React from 'react';

import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import { uniqueId } from 'lodash';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasksUi: {},
      tasks: {},
      userInput: {
        title: '',
        description: '',
        date: '',
      },
    };
  }

  setUserInput = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      userInput: { ...prevState.userInput, [name]: value },
    }));
  };

  deleteTask = (id) => () => {
    this.setState(({tasks}) => ({ tasks: {...tasks, [id]: null}}));
    this.setState(({tasksUi}) => ({ tasksUi: {...tasksUi, [id]: null}}));
  };

  markTask = (id) => () => {
    this.setState(({tasksUi}) => ({tasksUi: {...tasksUi, [id]: { status: !tasksUi[id].status }}}));
  }

  addTask = () => {
    const taskId = uniqueId();
    const {
      userInput: { title, description, date },
    } = this.state;
    const newTask = {
      title,
      description,
      date,
    };
    this.setState((prevState) => ({
      tasks: { ...prevState.tasks, [taskId]: newTask },
      tasksUi: { ...prevState.tasksUi, [taskId]: { status: false } },
      userInput: {
        title: '',
        description: '',
        date: '',
      },
    }));
  };
  render() {
    const { userInput, tasks, tasksUi } = this.state;

    return (
      <div className='form-wrp'>
        <TodoForm
          userInput={userInput}
          setUserInput={this.setUserInput}
          addTask={this.addTask}
        />
        <TodoList
          tasks={tasks}
          deleteTask={this.deleteTask}
          markTask={this.markTask}
          tasksUi={tasksUi}
        />
      </div>
    );
  }
}
