import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';


class ListTodosComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: 
            [
                /* {id: 1, description: 'Learn React', done: false, targetDate: new Date()},
                {id: 2, description: 'Learn to dance', done: false, targetDate: new Date()},
                {id: 3, description: 'Visit California', done: false, targetDate: new Date()} */
            ]
            
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retriveAllTodos(username) 
        .then (
            response => {
                //console.log(response)
                this.setState({
                    todos: response.data
                })
            }
        )
        console.log(username);
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        console.log(id + " " + username)
        
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>description</th>
                                <th>IsCompleted?</th>
                                <th>Target Date</th>
                                <th>Button</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                                )
                                
                            }
                        </tbody>
                    </table>
                </div>
                
            </div>
            
        )

    }
}

export default ListTodosComponent