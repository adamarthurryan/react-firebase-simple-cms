import React from "react"


export default class Message extends React.Component {
  
  render() {
    return <div className='message {this.props.level}'>
        <p>{this.props.message}</p>
      </div>
  }
}

Message.defaultProps = {
  message: "", level: "info"
}
