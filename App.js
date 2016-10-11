import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(){
    super();
    this.state = {
      red: 128,
      green: 128,
      blue: 128,
      val: 0,
      increasing: false
    };
    this.update = this.update.bind(this);
    this.clickUpdate = this.clickUpdate.bind(this);
  }
  clickUpdate(){
    this.setState({val: this.state.val + 1});
  }
  update(e){
    ReactDOM.render(
      <App val={this.props.val + 1} />,
      document.getElementById('app')
    );
    // this.setState({
    //   red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
    //   green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
    //   blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value
    // });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({increasing: nextProps.val > this.props.val});
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.val % 5 === 0;
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps', prevProps);
  }
  componentWillMount() {
    console.log('mounting!');
    // this.setState({m: 2});
  }
  componentDidMount() {
    console.log('mounted!');
    // this.inc = setInterval(this.clickUpdate, 500);
  }
  componentWillUnmount() {
    console.log('unmounted!');
    // clearInterval(this.inc);
  }
  render() {
    console.log('rendering!');
    console.log(this.state.increasing);
    return(
      <div>
        <br />
        <button onClick={this.update}>
          {this.props.val}
        </button>
      </div>
    )
  }
}

App.defaultProps = { val: 0 };

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


const Button = (props) => <button onClick={props.update}>{props.children} {props.val}</button>;

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
