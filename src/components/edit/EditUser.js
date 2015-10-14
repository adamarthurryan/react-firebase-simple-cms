import React from 'react';
import {fb} from "../../firebase"
import Message from "../Message"

//!!! abstract away firebase access to EditItem

export default class EditUser extends React.Component {
    
    componentWillMount() {
      this.state = {};

      this.ref = fb().child('user/'+this.props.params.id);

      this.ref.on("value", this.fbOnValue);
    }

    //!!! Should accomodate changed props
    //componentWillReceiveProps() {}

    componentWillUnmount() {
      //!!! ? 
      //this.ref.off();
    }

    //called when the firebase record changes or has a value
    fbOnValue = snapshot => {
      if (snapshot!=null)
        this.setState({user:snapshot.val()});  
    } 

    render() {
      if (!this.props.user) 
        return <Message message="Not authorized"/>
      

      if (!this.state.user)
        return <Message message="Loading..."/>

      //!!! add autosave checkbox
      //!!! add preview panel
      return <form>
        <div className='row'>
            <div className='large-9 columns'>
              <input placeholder='Name' ref='name' type='text' value={this.state.user.name} onChange={this.nameChange}/>
              <textarea rows="20" placeholder='Bio' ref='body' type='text' value={this.state.user.bio} onChange={this.bioChange}/>
            </div>
            <div className='large-offset-1 large-2 columns'>
             
            </div>
        </div>
      </form>;

    }

    nameChange = evt => this.ref.update({name:evt.target.value})
    bioChange = evt => this.ref.update({bio:evt.target.value})

}
