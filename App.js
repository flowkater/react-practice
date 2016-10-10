import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(){
    super();
    this.state = {
      red: 128,
      green: 128,
      blue: 128,
      val: 0
    };
    this.update = this.update.bind(this);
    this.clickUpdate = this.clickUpdate.bind(this);
  }
  clickUpdate(){
    this.setState({val: this.state.val + 1});
  }
  update(e){
    this.setState({
      red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
      green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
      blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value
    });
  }
  componentWillMount() {
    console.log('mounting!');
  }
  componentDidMount() {
    console.log('mounted!');
  }
  componentWillUnmount() {
    console.log('unmounted!');
  }
  render() {
    console.log('rendering!');
    return(
      <div>
        <Slider ref="red" update={this.update} />
        {this.state.red}
        <br />
        <Slider ref="green" update={this.update} />
        {this.state.green}
        <br />
        <Slider ref="blue" update={this.update} />
        {this.state.blue}
        <br />
        <Button clickUpdate={this.clickUpdate} val={this.state.val}>I <Heart /> react</Button>
      </div>
    )
  }
}

class Slider extends Component {
  render() {
    return (
      <div>
        <input ref="inp" type="range"
          min="0"
          max="255"
          onChange={this.props.update} />
      </div>

    );
  }
}

class Wrapper extends Component {
  constructor(){
    super();
  }
  mount(){
    ReactDOM.render(<App />,document.getElementById('a'));
  }
  unmount(){
    ReactDOM.unmountComponentAtNode(document.getElementById('a'));
  }
  render() {
    return (
      <div>
        <button onClick={this.mount.bind(this)}>Mount</button>
        <button onClick={this.unmount.bind(this)}>Unmount</button>
        <div id="a"></div>
      </div>
    );
  }
}


const Button = (props) => <button onClick={props.clickUpdate}>{props.children} {props.val}</button>;

const Heart = () => <span className="glyphicon glyphicon-heart"></span>

// const Widget = (props) => {
//   return(
//     <div>
//       <input type="text"
//         onChange={props.update} />
//       <h1>{props.txt}</h1>
//     </div>
//   )
// }

export default Wrapper;
