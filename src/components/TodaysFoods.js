import React from 'react';

class TodaysFood extends React.Component {
  handleDeleteClick = (event) => {
    if (event.target.className === 'button-remove') {
      this.props.deleteFromTodaysFoodList(event.target.name);
    }
  };

  render() {
    return (
      <div className="column content">
        <h2 className="subtitle">Today's foods</h2>
        <ul>
          {this.props.todaysFoodList.map((food) => {
            return (
              <li key={food.name}>
                {food.quantity} {food.name} = {food.calories * food.quantity}{' '}
                cal
                <button
                  className="button-remove"
                  name={food.name}
                  onClick={this.handleDeleteClick}
                >
                  remove
                </button>
              </li>
            );
          })}
        </ul>
        <strong>Total: {this.props.totalCalories} cal</strong>
      </div>
    );
  }
}

export default TodaysFood;
