import React from 'react'
import logo from './assets/img/logo.svg'
import {Router, Route} from 'react-router'

class Home extends Component {
  render(){
    return <img src={logo} className="App-logo" alt="logo" />
  }
}

// More components
class Car extends Component {
  render(){
    return (<h1>Cars page</h1>)
  }
}

class About extends Component {
  render(){
    return (<h1>About page</h1>)
  }
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Home}/>
        <Route path="/cars" component={Car}/>
        <Route path="/about" component={About}/>
      </Router>
    )
  }
}

export default App
