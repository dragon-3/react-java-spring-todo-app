import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/login" component={LoginComponent} />
                            <Route path="/welcome/:name" component={WelcomeComponent}/>
                            <Route path="/todos" component={ListTodosComponent}/>
                            <Route component={errorComponent} />
                        </Switch>
                        
                    </>
                </Router>
                {/* <LoginComponent />
                <WelcomeComponent /> */}
            </div>
        )
    }
}

class ListTodosComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: 
            [
                {id: 1, description: 'Learn React', done: false, targetDate: new Date()},
                {id: 2, description: 'Learn to dance', done: false, targetDate: new Date()},
                {id: 3, description: 'Visit California', done: false, targetDate: new Date()}
            ]
            
        }
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>description</th>
                            <th>Is completed?</th>
                            <th>Target Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                <tr>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                </tr>
                            )
                            
                        }
                    </tbody>
                </table>
            </div>
            
        )

    }
}

class WelcomeComponent extends Component {
    render() {
        return <div>
                Welcome, {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link>.
            </div>

    }
}

function errorComponent() {
    return <div>An error occured.</div>
}



class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'dragon3',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        //this.handleUsernameChange = this.handleUsernameChange.bind(this);
        //this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
        
    }

    handleChange(event) {
        console.log(event.target.name);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //handleUsernameChange(event) {
        //console.log(event.target.value);
        //this.setState({
          //  username: event.target.value
       // })
    //}

    //handlePasswordChange(event) {
    //    console.log(event.target.value);
    //    this.setState({
    //        password: event.target.value
    //    })
    //}

    loginClicked() {
        //console.log(this.state)
        if(this.state.username==='dragon3' && this.state.password==='dummy') {
            this.props.history.push(`/welcome/${this.state.username}`)
           /*  this.setState({
                showSuccessMessage: true
            }) */
            
        } else {
            console.log("Failed")
            this.setState({
                hasLoginFailed: true
            })
        }
    }

    render() {
        return(
            <div>
                {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} />*/}
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Successful</div>}
                {/*<ShowLoginMessage showSuccessMessage={this.state.showSuccessMessage} />*/}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button onClick={this.loginClicked}>Login</button>
            </div>
            
        )
    }
}

/* function ShowInvalidCredentials(props) {
    if(props.hasLoginFailed) {
        return <div>Invalid Credentials</div>

    }
    return null
}

function ShowLoginMessage(props) {
    if(props.showSuccessMessage) {
        return <div>Login Successful</div>

    }
    return null
} */

export default TodoApp;