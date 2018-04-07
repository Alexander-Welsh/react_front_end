import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      menuItems: [],
      value: ""
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  handleSubmit(event){
    console.log("event")
    fetch(`http://www.recipepuppy.com/api/?q=${this.state.value}`)
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
    event.preventDefault();
  }


  render() {
    console.log(this.state)
    return (
      <div className="App">
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        <div>
            {this.state.menuItems}
        </div>
      </div>
    );
  }
}

export default App;