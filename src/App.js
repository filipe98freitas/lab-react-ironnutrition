import React from 'react';
import './App.css';
import foods from './foods.json';
import FoodBox from './components/FoodBox';
import AddFoodForm from './components/AddFoodForm';
import Search from './components/Search';
import TodaysFood from './components/TodaysFoods';

class App extends React.Component {
  state = {
    foodArr: [...foods],
    filteredFoodArr: [...foods],
    todaysFoodList: [],
    totalCalories: 0,
  };

  // Adding a new food element
  updateFoodArr = (newArr) => {
    this.setState({ foodArr: [...newArr] });
    this.setState({ filteredFoodArr: [...newArr] });
  };

  // filterting based on the search input
  filteredFoodArr = (word) => {
    let filteredArr = this.state.foodArr.filter((food) => {
      return food.name.toLowerCase().includes(word);
    });
    this.setState({ filteredFoodArr: [...filteredArr] });
    if (word === '' || word === undefined || word === null) {
      this.setState({ filteredFoodArr: [...this.state.foodArr] });
    }
  };

  // Adding to today's food
  addToTodaysFoodList = (foodName, foodCalories, foodQuantity) => {
    let newFood = {
      name: foodName,
      calories: foodCalories,
      quantity: foodQuantity,
    };

    let newArr = [...this.state.todaysFoodList];
    let currentFood = newArr.find((element) => element.name === foodName);
    let indexOfCurrentFood = newArr.indexOf(currentFood);

    if (indexOfCurrentFood === -1) {
      newArr.push(newFood);
    } else {
      currentFood.quantity += foodQuantity;
    }
    this.setState({ todaysFoodList: newArr });
    this.setState({
      totalCalories: this.state.totalCalories + foodCalories * foodQuantity,
    });
  };

  // Deleting from today's food
  deleteFromTodaysFoodList = (foodName) => {
    let newArr = [...this.state.todaysFoodList];
    let currentFood = newArr.find((element) => element.name === foodName);
    let indexOfCurrentFood = newArr.indexOf(currentFood);
    this.setState({
      totalCalories:
        this.state.totalCalories - currentFood.calories * currentFood.quantity,
    });
    newArr.splice(indexOfCurrentFood, 1);
    this.setState({ todaysFoodList: newArr });
  };

  render() {
    return (
      <div className="container">
        <h1 className="title">IronNutrition</h1>
        <Search
          foods={this.state.foodArr}
          filteredFoodArr={this.filteredFoodArr}
        />
        <AddFoodForm
          foods={this.state.foodArr}
          updateFoodArr={this.updateFoodArr}
        />

        <div className="columns">
          <div className="column food-list">
            {this.state.filteredFoodArr.map((food) => {
              return (
                <FoodBox
                  name={food.name}
                  image={food.image}
                  calories={food.calories}
                  key={food.name}
                  addToTodaysFoodList={this.addToTodaysFoodList}
                  todaysFoodList={this.state.todaysFoodList}
                />
              );
            })}
          </div>
          <div className="column food-table">
            <TodaysFood
              todaysFoodList={this.state.todaysFoodList}
              totalCalories={this.state.totalCalories}
              deleteFromTodaysFoodList={this.deleteFromTodaysFoodList}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
