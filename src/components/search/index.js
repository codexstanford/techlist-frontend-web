import * as React from 'react';
import Downshift from 'downshift';
import Chip from '@material-ui/core/Chip';
import { navigate } from 'gatsby';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';

import { renderInput, renderSuggestion, getSuggestions } from './helpers';

class MainSearch extends React.Component {
  state = {
    inputValue: '',
    selectedItem: [],
  };

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === 'Backspace'
    ) {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      });
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedItem } = this.state;
    console.log(item);

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item.name];
    }

    this.setState(
      {
        inputValue: '',
        selectedItem,
      },
      navigate(`/companies/${item.slug}`)
    );
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return { selectedItem };
    });
  };

  render() {
    console.log(this.props);
    const { classes } = this.props;
    const { selectedItem, inputValue } = this.state;
    return (
      <Downshift
        id="main-search"
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={selectedItem}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex,
        }) => {
          return (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              {renderInput({
                fullWidth: true,
                classes,
                InputProps: getInputProps({
                  startAdornment: selectedItem.map(item => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      label={item}
                      className={classes.chip}
                      onDelete={this.handleDelete(item)}
                    />
                  )),
                  onChange: this.handleInputChange,
                  onKeyDown: this.handleKeyDown,
                  placeholder: 'Search',
                }),
              })}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions({
                    value: inputValue2,
                    data: this.props.suggestions,
                  }).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({
                        item: suggestion.node.context,
                      }),
                      highlightedIndex,
                      selectedItem: selectedItem2,
                    })
                  )}
                </Paper>
              ) : null}
            </div>
          );
        }}
      </Downshift>
    );
  }
}

export default MainSearch;
