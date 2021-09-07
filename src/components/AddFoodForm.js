import React from 'react';

class AddFoodForm extends React.Component {
  state = {
    name: '',
    calories: '',
    image: '',
    quantity: 0,
    addFood: false,
  };

  handleSubmit = (event) => {
    event.preventDefault(); // preventing the reload
    this.setState({ addFood: false }); // hiding the form and presenting the btn
    let newFood = {
      name: this.state.name,
      calories: this.state.calories,
      image: this.state.image,
      quantity: 0,
    };
    let newArr = [...this.props.foods];
    newArr.push(newFood);
    this.props.updateFoodArr(newArr);
  };

  renderForm = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Nome da Comida</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Nome da Comida"
              name="name"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Calories</label>
          <div className="control">
            <input
              className="input"
              type="number"
              min="0"
              placeholder="Quantidade de calorias"
              name="calories"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Imagem da comida</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Insira o url da comida"
              name="image"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="control">
          <button className="button is-link">Submit</button>
        </div>
      </form>
    );
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // For the button
  renderBtn = () => {
    return (
      <button className="button is-info" onClick={this.handleClick}>
        Add food here
      </button>
    );
  };
  handleClick = () => {
    this.setState({ addFood: true }); // hiding the btn and presenting the form
  };

  render() {
    return (
      <div>{this.state.addFood ? this.renderForm() : this.renderBtn()}</div>
    );
  }
}

export default AddFoodForm;
