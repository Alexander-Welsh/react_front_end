import React, { Component } from 'react';
import './App.css';

// Random "image not found" image from google search, no license necessary
const imgNotFound = "https://upload.wikimedia.org/wikipedia/commons/2/26/512pxIcon-sunset_photo_not_found.png"


class App extends Component {
  constructor(){
    super();
    this.state = {
      menuItems: [],
      value: "",
      addToMeal: "",
      meal: [],
      mealExists:""
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  handleAdd(event, id, recipe){
    let mealArray = this.state.meal.concat(recipe.title)
    this.setState({
      meal: mealArray,
      mealExists: "Your meal:"

    })
  }

  handleDelete(event, id, item){
    var array = this.state.meal
    var index = array.indexOf(item)
    array.splice(index, 1)
    this.setState({meal: array})
  }

  handleSubmit(event){
    event.preventDefault();
    fetch(`http://www.recipepuppy.com/api/?q=${this.state.value}`)
    .then(results => {
      return results.json();
    }).then(data => {
      let menuItems = data.results.map((item, iter) =>{
        return(
            <div className="items" key={iter} onClick={(e) => this.handleAdd(e, iter, item)}>
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
        <h2 id="show-if-meal">{this.state.mealExists}</h2>
        <div id="box-container">
          <div className="item-holder">
            {this.state.menuItems}
          </div>
          <div id="meal-items">
            <ol>
            {this.state.meal.map((item, iter)=>{
              return[
                  <li key={iter}>{item}</li>, <button key={iter + 50} className="small-remove" onClick={(e) => this.handleDelete(e, iter, item)}> Remove </button>
                ]
            })}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default App;