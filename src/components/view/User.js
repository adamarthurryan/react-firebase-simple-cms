import React from "react"
import {markdown} from "markdown"


export default class User extends React.Component {



  render() {
    console.log("render state", this.state);
    if (this.props.item) {
      return <div className="row">
        <h1 className="large-12 columns">{this.props.item.name}</h1>
        <div className="large-12 columns">{this.renderUserBio()}</div>
        <div className="large-12 columns"><em>Key: {this.props.item.key}</em></div>
      </div>;
    }
    else 
      return <div className="row">
        <p className="large-12 colunns"><em>Loading</em></p>
      </div>
  }

  renderUserBio() {
    if (this.props.item.bio) {
      var md = markdown.toHTML(this.props.item.bio);
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