import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSession } from '../../actions/userActions'

export class SignIn extends Component {
    state = {
        username: '',
        password: ''
    }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({
            username: '',
            password: ''
        })
        console.log('a')
        this.props.createSession(this.state)
        console.log('b')
        this.props.history.push('/')
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        return (
            <div className= 'sign-in-up'>
                <h2>Sign In</h2>
                <form className = "Sign_In_Form" onSubmit ={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type = 'text' id='username' name='username' value = {this.state.username} onChange = {this.handleChange} placeholder = "enter username"/>
                    <label htmlFor="password">Password</label>
                    <input type ='password' id='password' name='password' value = {this.state.password} onChange = {this.handleChange} placeholder='enter password'/>
                    <button type= "submit">Sign In</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        createSession: (userData) => dispatch(createSession(userData))
    }
}

export default connect(null, mapDispatchToProps)(SignIn)
