import React from 'react';

export default class EditPage extends React.Component {
    
    constructor() {
      super();
      this.state = {};
    }   

    render() {
    
      //!!! add autosave checkbox
      //!!! add preview panel
      return <form>
        <input placeholder='Title' ref='title' type='text' value={this.props.item.name} onChange={this.nameChange}/>
        <textarea rows="20" placeholder='Page Body' ref='body' type='text' value={this.props.item.body} onChange={this.bodyChange}/>
      </form>
    }

    nameChange = evt => this.props.updateItem({name:evt.target.value})
    bodyChange = evt => this.props.updateItem({body:evt.target.value})

}
