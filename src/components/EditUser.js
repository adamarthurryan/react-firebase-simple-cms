import React from 'react';
import {fb} from "../firebase"

export default class EditUser extends React.Component {
    
    componentWillMount() {
      this.state = {};

      this.ref = fb.child('user/'+this.props.params.id);

      this.ref.on("value", this.fbOnValue);
    }

    componentWillUnmount() {
      this.ref.off();
    }

    //called when the firebase record changes or has a value
    fbOnValue = snapshot => {
      if (snapshot!=null)
        this.setState({user:snapshot.val()});  
    } 

    render() {
      if (!this.props.authData) {
        //!!! this is an error condition
        //how to prevent this from occuring?
      }

      //!!! add autosave checkbox
      //!!! add preview panel
      return <form>
        <div className='row'>
            <div className='large-9 columns'>
              <input placeholder='Name' ref='name' type='text' value={this.state.page.name} onChange={this.nameChange}/>
              <textarea placeholder='Bio' ref='body' type='text' value={this.state.page.bio} onChange={this.bioChange}/>
            </div>
            <div className='large-offset-1 large-2 columns'>
             
            </div>
        </div>
      </form>;

    }

    nameChange = evt => this.pageRef.update({name:evt.target.value})
    bioChange = evt => this.pageRef.update({bio:evt.target.value})

}
