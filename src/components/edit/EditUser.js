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
              <input placeholder='Name' ref='name' type='text' value={this.props.item.name} onChange={this.nameChange}/>
              <textarea rows="20" placeholder='Bio' ref='body' type='text' value={this.props.item.bio} onChange={this.bioChange}/>
      </form>
    }

    nameChange = evt => this.props.updateItem({name:evt.target.value})
    bioChange = evt => this.props.updateItem({body:evt.target.value})

}
