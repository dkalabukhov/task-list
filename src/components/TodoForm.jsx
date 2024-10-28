import React from "react";
import "../TodoForm.css";

export default class TodoForm extends React.Component {
    handleChange = (e) => {
        const { setUserInput } = this.props;
        setUserInput(e);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { addTask } = this.props;
        addTask();
    };
    render() {
        const { userInput: { title, description, date} } = this.props;
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-input-wrp">
                    <input
                        type="text"
                        name="title"
                        className="form-input"
                        placeholder="Title"
                        value={title}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-input-wrp">
                    <input
                        type="text"
                        name="description"
                        className="form-input"
                        placeholder="Description"
                        value={description}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-input-wrp">
                    <input type="date" name="date" className="form-input" value={date} onChange={this.handleChange} />
                </div>
                <button className="btn" type="submit">
                    Add
                </button>
            </form>
        );
    }
}
