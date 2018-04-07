import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Random "image not found" image from google search, no license necessary
const imgNotFound = "https://upload.wikimedia.org/wikipedia/commons/2/26/512pxIcon-sunset_photo_not_found.png"


class App extends Component {
  constructor(){
    super();
    this.state = {
      menuItems: [],
      value: "",
      addToMeal: ""
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    console.log(this.state.menuItems)
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
            <div className="items" key={iter}>
              <h3>{item.title}</h3>
              <a href={item.href}>
                <img className="thumbnail" src={item.thumbnail ? item.thumbnail : imgNotFound} title={item.title} alt="Click here to see more"/>
              </a>
              <p><strong>Ingredients:</strong> {item.ingredients}</p>

            </div>
          )
      })
      this.setState({
        menuItems: menuItems,
        addToMeal: "Click on a dish to add it to a meal!"
      });
    })
    event.preventDefault();
  }


  render() {
    return (
      <div className="App">
      <h1> Search for a recipe!</h1>
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        <h2 id="add-meal-text">{this.state.addToMeal}</h2>
        <div className="item-holder">
            {this.state.menuItems}
        </div>
      </div>
    );
  }
}

export default App;