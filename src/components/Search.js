import React from 'react';

class Search extends React.Component {
  state = {
    typedSearch: '',
  };

  // Updating the state based on the input search value (at every change)
  handleSearch = (event) => {
    this.setState({ typedSearch: event.target.value });
  };

  // Calling this method to update when the user types, before the render method
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.typedSearch !== this.state.typedSearch) {
      this.props.filteredFoodArr(this.state.typedSearch);
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          className="input search-bar"
          name="search"
          placeholder="Search"
          onChange={this.handleSearch}
        />
      </div>
    );
  }
}

export default Search;
