import * as React from 'react';
import Downshift from 'downshift';
import { navigate } from 'gatsby';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import { StaticQuery, graphql } from 'gatsby';
import slugify from 'slugify';
import { renderInput, renderSuggestion, getSuggestions } from './helpers';
import users from '../../mocks/users';

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
    if (item.type === 'company') {
      return this.setState(
        {
          inputValue: '',
        },

        navigate(`/companies/${slugify(item.name)}`)
      );
    } else {
      return this.setState(
        {
          inputValue: '',
        },

        navigate(`/profiles/${slugify(item.name)}`)
      );
    }
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return { selectedItem };
    });
  };

  render() {
    const { classes, data } = this.props;
    const {
      allTechList: { organizations: companies },
    } = data;

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
                  onChange: this.handleInputChange,
                  onKeyDown: this.handleKeyDown,
                  placeholder: 'Search',
                }),
              })}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions({
                    value: inputValue2,
                    data: [...companies, ...users],
                  }).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({
                        item: suggestion.person
                          ? {
                              type: 'person',
                              name: `${suggestion.person.name[0].firstName.toLowerCase()}${suggestion.person.name[0].lastName.toLowerCase()}`,
                            }
                          : {
                              type: 'company',
                              name: suggestion.name[0].payload,
                            },
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

export default props => {
  return (
    <StaticQuery
      query={graphql`
        query SearchListQuery {
          allTechList {
            organizations {
              id
              name {
                id
                payload
              }
            }
          }
        }
      `}
      render={data => <MainSearch data={data} {...props} />}
    />
  );
};
