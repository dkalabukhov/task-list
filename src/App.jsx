import React from "react";

import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import { uniqueId } from "lodash";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            userInput: {
                title: "",
                description: "",
                date: "",
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
        this.setState(({ tasks }) => ({ tasks: tasks.filter((task) => task.id !== id) }))
    };

    markTask = (id) => () => {
        const { tasks } = this.state;
        const index = tasks.findIndex((task) => task.id === id);
        const newItem = { ...tasks[index], finished: !tasks[index].finished };
        const newItems = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)];

        this.setState({tasks: newItems});
    };

    addTask = () => {
        const { userInput: { title, description, date } } = this.state;
        const newTask = {
            id: uniqueId(),
            title,
            description,
            date,
            finished: false,
        };
        this.setState((prevState) => ({
            tasks: [...prevState.tasks, newTask],
            userInput: {
                title: "",
                description: "",
                date: "",
            },
        }));
    };
    render() {
        const { userInput, tasks } = this.state;

        return (
            <div className="form-wrp">
                <TodoForm userInput={userInput} setUserInput={this.setUserInput} addTask={this.addTask} />
                <TodoList tasks={tasks} deleteTask={this.deleteTask} markTask={this.markTask} />
            </div>
        );
    }
}
