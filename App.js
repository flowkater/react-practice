import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let Mixin = InnerComponent => class extends Component {
  constructor(){
    super();
    this.state = {
      val: 0,
      red: 0
    };
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
  constructor(){
    super();
    this.state = {
      val: 0,
      red: 0,
      data: [
        {id: 1, name: "Simon Bailey"},{id: 2, name: "Thomas Burleson"},
        {id: 3, name: "Will Button"},{id: 4, name: "Ben Clinkinbeard"},
        {id: 5, name: "Kent Dodds"},{id: 6, name: "Trevor Ewen"},
        {id: 7, name: "Aaron Frost"},{id: 8, name: "Joel Hooks"},
        {id: 9, name: "Jafar Husain"},{id: 10, name: "Tim Kindberg"},
        {id: 11, name: "John Lindquist"},{id: 12, name: "Joe Maddalone"},
        {id: 13, name: "Tyler McGinnis"},{id: 14, name: "Scott Moss"},
        {id: 15, name: "Robert Penner"},{id: 16, name: "Keith Peters"},
        {id: 17, name: "Lukas Ruebbelke"},{id: 18, name: "Brett Shollenberger"}
      ]
    };
    this.update = this.update.bind(this);
  }
  update(e){
    this.setState({
      red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value
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
    let rows = this.state.data.map( person => {
      return <PersonRow key={person.id} data={person} />
    });
    return(
      <div>
        <NumInput
          ref="red"
          min={0}
          max={255}
          step={0.01}
          val={+this.state.red}
          label="Red"
          update={this.update} />

        <table>
          <tbody>{rows}</tbody>
        </table>
      </div>
    )
  }
}

const PersonRow = (props) => {
  return <tr>
    <td>{props.data.id}</td>
    <td>{props.data.name}</td>
  </tr>
}

class NumInput extends Component {
  render() {
    let label = this.props.label !== '' ?
      <label>{this.props.label} - {this.props.val}</label> : ''
    return (
      <div>
        <input ref="inp"
          type={this.props.type}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          defaultValue={this.props.val}
          onChange={this.props.update} />
        {label}
      </div>
    );
  }
}

NumInput.propTypes = {
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,
  val: React.PropTypes.number,
  label: React.PropTypes.string,
  update: React.PropTypes.func.isRequired,
  type: React.PropTypes.oneOf(['number','range'])
}

NumInput.defaultProps = {
  min: 0,
  max: 0,
  step: 1,
  val: 0,
  label: '',
  type: 'range'
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
