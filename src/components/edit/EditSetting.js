import React from 'react';

export default class EditSetting extends React.Component {
   
    constructor() {
      super();
      this.state = {};
    }   

    render() {
      switch (this.props.item._key) {
        case "site":
          return <form>
            <h1>{this.props.item.name}</h1>
            <input placeholder='Site Title' ref='title' type='text' value={this.props.item.title} onChange={this.titleChange}/>
          </form>

        default:
          return null;
      }
    }

    titleChange = evt => this.props.updateItem({title:evt.target.value})
}
