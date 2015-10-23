import React from "react"
import EditPage from "./EditPage"
import EditUser from "./EditUser"
import EditSetting from "./EditSetting"
import {fb} from "../../firebase"
import Message from "../Message"
import {navigate} from "../../router"

// Todo: items being edited should save to a draft revision
// Todo: items should have permalinks generated from their name/title

// !!! should the individual edit components extend this as a base class instead?
// then the individual edit components could be selected in the route

// !!! parameters: manual set type, allowDelete

export default class EditItem extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.acceptProps(this.props);
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
    this.acceptProps(nextProps);
  }

  //take in the new props and adjust component state accordingly
  acceptProps(props) {
    //decide if this is a new page or an edit page
    // if this is not a new item, we can create an item ref for it
    if (!this.props.isNew) {
      this.itemRef = fb().child(this.props.type+'/'+this.props.id);
      this.itemRef.once("value", snapshot => {
        var item = snapshot.val();
        item._key = snapshot.key();
        this.setState({item});
      });
      //this.watcher = new FBObjectWatcher(itemRef);
      //this.watcher.on("value", item => this.setState({item}));
    }

    //otherwise... for now no item ref, this might change later
    else {
      this.setState({item:{}});
      //once upon a time we used to create the item here
      //this.pageRef = fb().child('page').push();
      //this.pageRef.update({owner:this.props.user.key, name:"", body:""});
      //this.props.history.replaceState(this.props.history.getState().data, "/edit/page/"+this.pageRef.key());
    }

  }

  render() {
    //!!! of course, there should me a more intelligent way of deciding whether a user is authorized to edit a resource
    if (!this.props.user) 
      return <Message message="Not authorized"/>
   
    //null items will not be passed to the edit component if this is not a new item
    //however, the edit component is currently responsible for filling in the default values of new items   
    if (!this.state.item && !this.props.isNew)
      return <Message message="Loading..."/>

    //it might be possible to do away with per-item editing and use some generic form generating system

    //!!! add preview button?
    return <div className='row'>
      <div className='large-9 columns'>
        {this.renderEditComponent()}
      </div>
      <div className='large-offset-1 large-2 columns'>
        <button onClick={this.saveClick}>{"Save"}</button>
        <button onClick={this.deleteClick}>{this.props.isNew?"Cancel":"Delete"}</button>
      </div>
    </div>;
  }

  renderEditComponent() {  
    //this should be made dynamic
    if (this.props.type == 'user')
      return <EditUser {...this.props} {...this.state} updateItem={this.updateItem}/>
    else if (this.props.type == 'page')
      return <EditPage {...this.props} {...this.state} updateItem={this.updateItem}/>
    else if (this.props.type == 'setting')
      return <EditSetting {...this.props} {...this.state} updateItem={this.updateItem}/>
  }

  deleteClick = evt => {
    evt.preventDefault();
    //!!! Should confirm delete
    if (!this.props.isNew) {
      this.itemRef.off();
      this.itemRef.remove();
    }

    //!!! There is probably a better place to go than to the root!
    navigate('/');
  }

  saveClick = evt => {
    evt.preventDefault();

    //delete the _key property before saving the item
    var item = Object.assign({}, this.state.item);
    if (item._key)
      delete item._key;

    if (!this.props.isNew) {
      this.itemRef.update(item);
    }
    else {
      this.itemRef = fb().child(this.props.type).push(item);

      navigate("/"+this.props.type+"/"+this.itemRef.key()+"/edit");      
    }

  }


  //called by the edit component to update the item in firebase
  updateItem = newItem => {
    var item = this.state.item;
    Object.assign(item, newItem);
    this.setState(newItem);
  }

}

EditItem.defaultProps = {allowDelete: true, isNew: false};