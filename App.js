import React, { Component } from 'react';

class App extends Component {
  constructor(){
    super();
    this.state = {txt: ''};
    this.update = this.update.bind(this);
  }
  update(e){
    this.setState({txt: e.target.value});
  }
  render() {
    return(
      <div>
        <Widget txt={this.state.txt} update={this.update} />
        <Widget txt={this.state.txt} update={this.update} />
        <Widget txt={this.state.txt} update={this.update} />
        <Widget txt={this.state.txt} update={this.update} />
        <Widget txt={this.state.txt} update={this.update} />
        <Widget txt={this.state.txt} update={this.update} />
        <Widget txt={this.state.txt} update={this.update} />
        <Widget txt={this.state.txt} update={this.update} />
      </div>
    )
  }
}

class Slider extends Component {
  render() {
    return (
      <div></div>
    );
  }
}


const Widget = (props) => {
  return(
    <div>
      <input type="text"
        onChange={props.update} />
      <h1>{props.txt}</h1>
    </div>
  )
}

export default App;
