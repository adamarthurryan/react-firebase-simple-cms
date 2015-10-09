import React from 'react';
import {fb} from "../firebase"

export default class Login extends React.Component {
    render() {

        if (this.props.authData)
            return <form>
                <div className='row'> 
                    <p className="large-12 columns"> Hi {this.props.authData.uid}! </p>
                    <button onClick={this.signout}> Log Out </button>
                </div>
            </form>;

        return <form>
            <div className='row'>
                <div className='large-12 columns'> <input placeholder='Email' ref='email' type='text' /></div>
                <div className='large-12 columns'> <input placeholder='Password' ref='password' type='password' /></div>
                <div className='large-offset-6 large-6 columns'>
                    <ul className='small-block-grid-2'>
                        <li><button onClick={this.signin}> Log In </button></li>
                        <li><button onClick={this.signup}> Sign Up </button></li>
                    </ul>
                </div>
            </div>
        </form>;
    }

    signin = evt => {
        var email = React.findDOMNode(this.refs.email).value,
            password = React.findDOMNode(this.refs.password).value;

        fb.authWithPassword(
            {email, password}, 
            (error, authData) => {
                if (error) console.log("Error logging user in:",  error)
            }
        );

        evt.preventDefault();
    }

    signup = evt => {
        var email = React.findDOMNode(this.refs.email).value,
            password = React.findDOMNode(this.refs.password).value;

        fb.createUser(
            {email, password}, 
            (error, authData) => {
                if (error) console.log("Error logging user up:",  error)
                else {
                    console.log("Successfully created user account with uid:", authData.uid);
                    this.signin(evt)
                }
            }
        );

        evt.preventDefault();

    }
        
    signout = evt => {
        fb.unauth();
        evt.preventDefault();
    }
}
