import React from "react"
import {markdown} from "markdown"


export default class User extends React.Component {



  render() {
    return <div className="row">
      <h1 className="large-12 columns">{this.props.item.name}</h1>
      <div className="large-12 columns">{this.renderUserBio()}</div>
      <div className="large-12 columns"><em>Key: {this.props.item.key}</em></div>
    </div>;
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