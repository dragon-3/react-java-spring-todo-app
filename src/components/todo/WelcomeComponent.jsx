import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService'


class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.retriveWelcomeMessage = this.retriveWelcomeMessage.bind(this)
        this.handleSuccefulResponse = this.handleSuccefulResponse.bind(this)
        this.state ={
            welcomeMessage: ''
        }
    }

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}. 
                    You can manage your todos <Link to="/todos">here</Link>.
                </div>

                <div className="container">
                    Click here to get a message
                    <button onClick={this.retriveWelcomeMessage} className="btn btn-success">Welcome message</button>
                </div>

                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }
    retriveWelcomeMessage() {
        HelloWorldService.executeHelloWorldService()
        .then(response =>this.handleSuccefulResponse(response))
        //.catch()
    }

    handleSuccefulResponse(response) {
        this.setState({
            welcomeMessage: response.data
        })
    }
}

export default WelcomeComponent