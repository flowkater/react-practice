import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let Mixin = InnerComponent => class extends Component {
  constructor(){
    super();
    this.state = {val: 0};
    this.update = this.update.bind(this);
  }
  update(e){
    this.setState({val: this.state.val + 1});
  }
  componentWillMount() {
    console.log('mounting!');
  }
  render(){
    return <InnerComponent
      update={this.update}
      {...this.state}
      {...this.props} />
  }
  componentDidMount() {
    console.log('mounted!');
  }
  componentWillUnmount() {
    console.log('unmounted!');
  }
}

const Button = (props) => <button onClick={props.update}>{props.txt} - {props.val}</button>;
const Label = (props) => <label onMouseMove={props.update}>{props.txt} - {props.val}</label>;

let ButtonMixed = Mixin(Button);
let LabelMixed = Mixin(Label);

class App extends Component {
  render() {
    return(
      <div>
        <ButtonMixed txt="Button" />
        <LabelMixed txt="Label" />
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

export default App;
