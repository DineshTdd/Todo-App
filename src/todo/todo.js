import React, {Component} from 'react';
import './todo.css';
import { connect } from 'react-redux';

import Card from '../Components/Card/Card';
import * as todoActions from '../store/action/_todo';


class Todo extends Component {
    state = {
        todoInput: ''
    }
    handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            if ((this.state.todoInput.trim()).length === 0) {
                this.setState({todoInput: ''});
                return;
            }
            this.props.onAddTodo(this.state.todoInput);
            this.setState({todoInput: ''});
        }
    };

    todoInputChangeHandler = (event) => {
        this.setState({todoInput: event.target.value});
    };

    render () {
        return (
        <div className="flex-container">
            <div className="container">
            <Card className="backdrop dimension">
                <div>
                <div className="Header">
                    <input type="text" onChange={this.todoInputChangeHandler} onKeyPress={this.handleKeyPress} value={this.state.todoInput} placeholder="What needs to be done!"/>
                </div>
                <div className="card-content">
                    {this.props.todoList.slice(0).reverse().map(todo => (
                        <div key={todo.id} className="todos">
                            <div className="todo-item" >{todo.todo}</div>
                            <button className="delete-button" onClick={() => {this.props.onDeleteTodo(todo.id)}} type="button">x</button>
                        </div>
                    ))}
                </div>
                <div className="Footer">
                    <div className="button-container">
                        <button type="button">All</button>
                        <button type="button">Active</button>
                        <button type="button">Completed</button>
                    </div>
                </div>
                </div>
            </Card>
             </div>
        </div>
    );
    };
};


const mapStateToProps = state => {
    return {
        todoList: state.todo.todoList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddTodo: (todo) => dispatch({type: todoActions.ADD_TODO, payload: {todo}}),
        onDeleteTodo: (id) => dispatch({type: todoActions.DELETE_TODO, payload: {id}})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);