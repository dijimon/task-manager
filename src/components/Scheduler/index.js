// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import Styles from './styles';
import initialState from './todos';
import Checkbox from 'theme/assets/Checkbox';
import todoActions from 'actions/todo';

// Components
import Task from 'components/Task';

class Scheduler extends Component {
    constructor () {
        super();

        this.state = {
            todos:    initialState.todos,
            todoName: '',
        };
    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.createTodo();
    }

    changeTodoName = (e) => {
        const todoName = e.target.value;

        this.setState(() => ({
            todoName,
        }));
    }

    createTodo = () => {
        const todoName = { id: 'qwerty', message: this.state.todoName, completed: false, favorite: false };


        this.props.todoActions.create(todoName);
    }

    complete = (id) =>
        this.setState(({ todos }) => ({
            todos: todos.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }

                return todo;
            }),
        }));

    changePriority = (id) =>
        this.setState(({ todos }) => ({
            todos: todos.map((todo) => {
                if (todo.id === id) {
                    todo.important = !todo.important;
                }

                return todo;
            }),
        }));

    completeAll = () =>
        this.setState(({ todos }) => ({
            todso: todos.map((todo) => {
                todo.completed = true;

                return todo;
            }),
        }));

    render () {
        const { todos } = this.state;
        const allCompleted = todos.every((todo) => todo.completed);
        const todoList = todos.map(({ id, message, completed, favorite }) => (
            <Task
                changePriority = { this.changePriority }
                complete = { this.complete }
                completed = { completed }
                favorite = { favorite }
                id = { id }
                key = { id }
                message = { message }
            />
        ));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = 'search' />
                    </header>
                    <section>
                        <form onSubmit = { this.handleSubmit }>
                            <input onChange = { this.changeTodoName } placeholder = 'Описание моей новой задачи' type = 'text' />
                            <button>Добавить задачу</button>
                        </form>
                        <ul>{todoList}</ul>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { allCompleted }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this.completeAll }
                        />
                        <code>Все задачи выполнены</code>
                    </footer>
                </main>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
    todoActions: bindActionCreators({ ...todoActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
