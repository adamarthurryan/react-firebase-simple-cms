import React from 'react';
import {fb} from "../firebase"

//rewrite to create page automatically
//then have button for delete

export default class EditPage extends React.Component {
    
    componentWillMount() {
      this.state = {};

      //decide if this is a new page or an edit page
      this.state.new = (this.props.params.id == "new");

      
      if (! this.state.new) {
        this.state.id = this.props.params.id;

        //mount the listener for this page in firebase
        this.fbRef = fb.child('pages/'+this.state.id);
        this.fbRef.on("value", this.fbOnValue);

      }
      else {
        this.state.title="";
        this.state.body="";
        console.log(this.props.authData);
        this.state.owner=this.props.authData.uid;
      }
    }

    componentWillUnmount() {
      if (this.fbRef)
        this.fbRef.off();
    }

    //called when the firebase record changes or has a value
    fbOnValue = snapshot => {
      this.setState(snapshot.val());  
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
                <div className='large-12 columns'> 
                  <input placeholder='Title' ref='title' type='text' value={this.state.title} onChange={this.titleChange}/>
                </div>
                <div className='large-12 columns'> 
                  <textarea placeholder='Page Body' ref='body' type='text' value={this.state.body} onChange={this.bodyChange}/>
                </div>
                <div className='large-offset-6 large-6 columns'>

                    <ul className='small-block-grid-2'>
                        <li><button onClick={this.save}>{this.state.new?"Save":"Update"}</button></li>
                    </ul>
                </div>
            </div>
          </form>;

    }

    

    titleChange = evt => this.setState({title:evt.target.value})
    bodyChange = evt => this.setState({body:evt.target.value})

    save = evt => {
      try {
        if (this.state.new)
            var pageRef = fb.child('pages').push();
        else
            pageRef = fb.child('pages/'+this.state.id);

        pageRef.set({title:this.state.title, body:this.state.body, owner:this.state.owner}, error => {
          if (error) console.log("pages push error", error);
        });
      }
      catch (ex) {
        console.log("page save exception", ex);
      }

      evt.preventDefault()
    }

}
