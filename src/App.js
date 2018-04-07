import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      menuItems: []
    };
  }

  componentDidMount(){
    fetch('http://www.recipepuppy.com/api/?q=onions')
    .then(results => {
      console.log(results)
      return results.json();
    }).then(data => {
      console.log(data)
      let menuItems = data.results.map((item, iter) =>{
        return(
            <div key={iter}>
              <img src={item.thumbnail} alt={item.title}/>
              <a href={item.href}>Learn More!</a>

            </div>
          )
      })
      this.setState({menuItems: menuItems});
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <div>
            {this.state.menuItems}
        </div>
      </div>
    );
  }
}

export default App;