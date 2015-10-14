import React from 'react';
import {fb} from "../../firebase"
import Message  from "../Message"

//rewrite to handle new user case with a wrapper?
export default class EditPage extends React.Component {
    
    componentWillMount() {
      this.state = {};


      //decide if this is a new page or an edit page
      this.state.new = (this.props.route.isNew);

      if (this.state.new) {
        this.pageRef = fb().child('page').push();
        this.pageRef.update({owner:this.props.user.key, name:"", body:""});

        //!!! hey, we should probably copy the state instead of writing it null
        //this.props.history.replaceState(null, "/edit/page/"+this.pageRef.key());
        //does this work?
        this.props.history.replaceState(this.props.history.getState().data, "/edit/page/"+this.pageRef.key());
      }
      else {
        this.pageRef = fb().child('page/'+this.props.params.id);
      }

      this.pageRef.on("value", this.fbOnValue);
    }

    //!!! Should accomodate changed props
    //componentWillReceiveProps() {}

    componentWillUnmount() {
      this.pageRef.off();
    }

    //called when the firebase record changes or has a value
    fbOnValue = snapshot => {
      if (snapshot!=null)
        this.setState({page:snapshot.val()});  
    } 

    render() {
      if (!this.props.user) 
        return <Message message="Not authorized"/>
      

      if (!this.state.page)
        return <Message message="Loading..."/>

      //!!! add autosave checkbox
      //!!! add preview panel
      return <form>
        <div className='row'>
            <div className='large-9 columns'>
              <input placeholder='Title' ref='title' type='text' value={this.state.page.name} onChange={this.nameChange}/>
              <textarea rows="20" placeholder='Page Body' ref='body' type='text' value={this.state.page.body} onChange={this.bodyChange}/>
            </div>
            <div className='large-offset-1 large-2 columns'>
              <button onClick={this.deletePage}>{this.state.new?"Cancel":"Delete"}</button>
            </div>
        </div>
      </form>;

    }

    deletePage = evt => {
      this.pageRef.off();
      this.pageRef.remove();
      this.props.history.pushState(null, "/");
      evt.preventDefault();
    }

    nameChange = evt => this.pageRef.update({name:evt.target.value})
    bodyChange = evt => this.pageRef.update({body:evt.target.value})

}
