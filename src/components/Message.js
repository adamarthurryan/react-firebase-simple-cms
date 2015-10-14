import React from "react"


export default class Message extends React.Component {
  
  render() {
    console.log(this.props);
    return <div>
        <p><em>{this.props.level}</em><span>{this.props.message}</span></p>
      </div>
  }
}

Message.defaultProps = {
  message: "", level: "info"
}
