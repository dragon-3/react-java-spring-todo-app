import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/login" component={LoginComponent} />
                            <Route path="/welcome/:name" component={WelcomeComponent}/>
                            <Route path="/todos" component={ListTodosComponent}/>
                            <Route path="/logout" component={LogoutComponent} />
                            <Route component={errorComponent} />
                        </Switch>
                        <FooterComponent/>
                        
                    </>
                </Router>
                {/* <LoginComponent />
                <WelcomeComponent /> */}
            </div>
        )
    }
}

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn);

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="" className="navbar-brand">dragon3</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li ><Link className="nav-link" to="/welcome/dragon3">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

//export default withRouter(HeaderComponent);

class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All Rights Reserved 2021 @dragon3</span>
            </footer>
        )
    }
}

class LogoutComponent extends Component {
    render() {
        return (
            <div>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank you for using our application
                </div>
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
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>description</th>
                                <th>Is completed?</th>
                                <th>Target Date</th>
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

class WelcomeComponent extends Component {
    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link>.
                </div>
            </>
        )



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
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
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
                <h1>Login</h1>
                <div className="container">
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} />*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {/*<ShowLoginMessage showSuccessMessage={this.state.showSuccessMessage} />*/}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
                
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