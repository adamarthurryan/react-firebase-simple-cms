import {fb, FBObjectWatcher} from "../firebase"
import React from "react"
import {markdown} from "markdown"


export default class User extends React.Component {

  componentWillMount() {
    this.setState({user:null});
    this.itemWatcher = new FBObjectWatcher(fb().child('user/'+this.props.params.id));
    this.itemWatcher.on(item => this.setState({user: item}));
  }

  componentWillReceiveProps(nextProps) {
    this.itemWatcher.off();
    this.itemWatcher = new FBObjectWatcher(fb().child('user/'+nextProps.params.id));
    this.itemWatcher.on(item => this.setState({user: item}));
  }

  componentWillUnmount() {
    this.itemWatcher.off();
  }

  render() {
    console.log("render state", this.state);
    if (this.state.user) {
      return <div className="row">
        <h1 className="large-12 columns">{this.state.user.name}</h1>
        <div className="large-12 columns">{this.renderUserBio()}</div>
        <div className="large-12 columns"><em>Key: {this.state.user.key}</em></div>
      </div>;
    }
    else 
      return <div className="row">
        <p className="large-12 colunns"><em>Loading</em></p>
      </div>
  }

  renderUserBio() {
    if (this.state.user.bio) {
      var md = markdown.toHTML(this.state.user.bio);
      return <div dangerouslySetInnerHTML={{__html: md}}></div>
    }
  }

    //called when the firebase record changes or has a value
  //fbOnValue = snapshot => {
  //  console.log("fbOnValue snapshot.ref().toString()", snapshot.ref().toString());
  //  console.log("fbOnValue snapshot", snapshot.val());
  //  this.setState({user:snapshot.val()});  
  //} 

}