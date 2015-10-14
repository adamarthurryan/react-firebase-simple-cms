import React from "react"
import {markdown} from "markdown"


export default class Page extends React.Component {


  render() {
    if (this.props.item) {
      return <div className="row">
        <h1 className="large-12 columns">{this.props.item.name}</h1>
        <div className="large-12 columns">{this.renderPageBody()}</div>
        <div className="large-12 columns"><em>Key: {this.props.item.key}</em></div>
      </div>;
    }
    else 
      return <div className="row">
        <p className="large-12 colunns"><em>Loading</em></p>
      </div>
  }

  renderPageBody() {
    if (this.props.item.body) {
      var md = markdown.toHTML(this.props.item.body);
      return <div dangerouslySetInnerHTML={{__html: md}}></div>
    }
  }

}