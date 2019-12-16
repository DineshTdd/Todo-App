import React, {Component} from 'react';
import './todo.css';
import { connect } from 'react-redux';

import Card from '../Components/Card/Card';
import * as todoActions from '../store/action/_todo';


class Todo extends Component {
    state = {
        todoInput: '',
        todoList: this.props.todoList.slice(0)
    }


    handleKeyPress = async (event) => {
        if(event.key === 'Enter') {
            if ((this.state.todoInput.trim()).length === 0) {
                this.setState({todoInput: ''});
                return;
            }
            await this.props.onAddTodo(this.state.todoInput);
            await this.props.getActiveTodos();
            this.props.getCompletedTodos();
            this.setState({todoInput: '', todoList: this.props.todoList.filter(x => x)});
        }
    };

    onDelete = async (id) => {
        await this.props.onDeleteTodo(id);
        this.setState({todoList: this.props.todoList.filter(x => x)});
    };

    todoInputChangeHandler = (event) => {
        this.setState({todoInput: event.target.value});
    };

    allTodos = async () => {
        await this.props.getAllTodos();
        this.setState({todoList: this.props.todoList.filter(x => x)});
    };

    activeTodos = async () => {
        await this.props.getActiveTodos();
        this.setState({todoList: this.props.todoActiveList.filter(x => x)});
    };

    completedTodos = async () => {
        await this.props.getCompletedTodos();
        this.setState({todoList: this.props.todoCompletedList.filter(x => x)});
    };

    clearCompletedTodos = async () => {
        await this.props.clearCompletedTodos();
        await this.props.getCompletedTodos();
        await this.props.getAllTodos();
        this.setState({todoList: this.props.todoList.filter(x => x)});
    };

    toggleCompleted = async (id) => {
        await this.props.onToggleCompleted(id);
        await this.props.getAllTodos();
        await this.props.getCompletedTodos();
        await this.props.getActiveTodos();
        this.setState({todoList: this.props.todoList.filter(x => x)});
    }

    render () {
        let Footer;
        let activeItemIndicator = (<div className="item-indicator">
        <span>{this.props.todoActiveList.length} {(this.props.todoActiveList.length === 1)? 'item left' : 'items left'}</span>
        </div>) ;
        let clearCompleted = '';
        if (this.props.todoCompletedList.length > 0) {
            clearCompleted = (<div className="clear-completed">
                <button onClick={this.clearCompletedTodos} title="Clear completed" className="clear-button" type="button">Clear</button>
            </div>);
        }
        if (this.props.todoList.length === 0) {
            Footer = '';
        } else {
            if (this.props.todoList.length === 0) {
                activeItemIndicator = '';
            }
            Footer = (<div className="Footer">
            {activeItemIndicator}               
            <div className="button-container">
                <button type="button" onClick={this.allTodos}>All</button>
                <button type="button" onClick={this.activeTodos}>Active</button>
                <button type="button" onClick={this.completedTodos}>Completed</button>
            </div>
            {clearCompleted}
            </div>);
        }
        return (
        <div className="flex-container">
            <div className="container">
            <Card className="backdrop dimension">
                <div>
                <div className="Header">
                    <input type="text" onChange={this.todoInputChangeHandler} onKeyPress={this.handleKeyPress} value={this.state.todoInput} placeholder="What needs to be done?"/>
                </div>
                <div className="card-content">
                    <div className="todos-container">
                    {this.state.todoList.slice(0).reverse().map(todo => (
                        <div onClick={() => {this.toggleCompleted(todo.id)}} className="item-container" key={todo.id}>
                        <div  className="todos">
                            <div className="todo-item">
                            <div className={todo.completed ? 'strike apply' : 'strike'}>{todo.todo}</div>
                            </div>
                            <div className="delete-button-container">
                                <div>
                            <button className="delete-button" onClick={() => {this.onDelete(todo.id)}} type="button">X</button>
                                </div>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                {Footer}
                </div>
            </Card>
             </div>
        </div>
    );
    };
};


const mapStateToProps = state => {
    return {
        todoList: state.todo.todoList,
        todoActiveList: state.todo.todoActiveList,
        todoCompletedList: state.todo.todoCompletedList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddTodo: (todo) => dispatch({type: todoActions.ADD_TODO, payload: {todo}}),
        onDeleteTodo: (id) => dispatch({type: todoActions.DELETE_TODO, payload: {id}}),
        getAllTodos: () => dispatch({type: todoActions.ALL_TODOS}),
        getActiveTodos: () => dispatch({type: todoActions.ACTIVE_TODOS}),
        getCompletedTodos: () => dispatch({type: todoActions.COMPLETED_TODOS}),
        clearCompletedTodos: () => dispatch({type: todoActions.CLEAR_COMPLETED_TODOS}),
        onToggleCompleted: (id) => dispatch({type: todoActions.TOGGLE_COMPLETED, payload: {id}})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);