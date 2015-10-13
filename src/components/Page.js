import {fb, FBObjectWatcher} from "../firebase"
import React from "react"
import {markdown} from "markdown"


export default class Page extends React.Component {

  componentWillMount() {
    this.setState({page:null});
    this.itemWatcher = new FBObjectWatcher(fb().child('page/'+this.props.params.id));
    this.itemWatcher.on(item => this.setState({page: item}));
  }

  componentWillReceiveProps(nextProps) {
    this.itemWatcher.off();
    this.itemWatcher = new FBObjectWatcher(fb().child('page/'+nextProps.params.id));
    this.itemWatcher.on(item => this.setState({page: item}));
  }

  componentWillUnmount() {
    this.itemWatcher.off();
  }

  render() {
    console.log("render state", this.state);
    if (this.state.page) {
      return <div className="row">
        <h1 className="large-12 columns">{this.state.page.name}</h1>
        <div className="large-12 columns">{this.renderPageBody()}</div>
        <div className="large-12 columns"><em>Key: {this.state.page.key}</em></div>
      </div>;
    }
    else 
      return <div className="row">
        <p className="large-12 colunns"><em>Loading</em></p>
      </div>
  }

  renderPageBody() {
    if (this.state.page.body) {
      var md = markdown.toHTML(this.state.page.body);
      return <div dangerouslySetInnerHTML={{__html: md}}></div>
    }
  }

}