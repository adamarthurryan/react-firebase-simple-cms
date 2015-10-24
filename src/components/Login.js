import React from 'react';
import ReactDOM from 'react-dom';
import {fb} from "../firebase"
import {navigate} from '../router'

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
        <div className='large-8 columns'> 
          <input placeholder='Email' ref='email' type='text' />
          <input placeholder='Password' ref='password' type='password' />
        </div>
        <div className='large-offset-1 large-3 columns'>
          <button onClick={this.signin}> Log In </button>
          <button onClick={this.signup}> Sign Up </button>
        </div>
      </div>
    </form>;
  }

  signin = evt => {
    evt.preventDefault();

    var email = ReactDOM.findDOMNode(this.refs.email).value,
      password = ReactDOM.findDOMNode(this.refs.password).value;

    fb().authWithPassword(
      {email, password}, 
      (error, authData) => {
        if (error) console.log("Error logging user in:",  error)
        else {
          navigate("/");
        }
      }
    );
  }

  signup = evt => {
    evt.preventDefault();

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
  }
    
  signout = evt => {
    evt.preventDefault();

    fb.unauth();
  }
}
