import * as React from 'react';
import Downshift from 'downshift';
import Chip from '@material-ui/core/Chip';
// import { navigate } from 'gatsby';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import { StaticQuery, graphql } from 'gatsby';
import slugify from 'slugify';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';

import { renderInput, renderSuggestion, getSuggestions } from './helpers';
import { checkForSectionErrors } from '../../helpers';

class CompanySearch extends React.Component {
  state = {
    inputValue: '',
    selectedItem: [],
  };

  componentDidMount() {
    if (this.props.initialCompany) {
      this.props.setValues({ AffiliationCompany: this.props.initialCompany });
      this.props.setTouched('AffiliationCompany');
      this.setState(prevState =>
        this.props.initialCompany
          ? {
              inputValue: this.props.initialCompany.name[0].payload,
              selectedItem: [this.props.initialCompany],
            }
          : prevState
      );
    }
  }

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
    this.props.setValues({ AffiliationCompany: '' });

    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    this.props.setValues({ AffiliationCompany: item });
    this.setState({
      inputValue: item.name[0].payload,
      selectedItem: [item],
    });
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return { selectedItem };
    });
  };

  render() {
    const { classes, data, errors, handleBlur, touched } = this.props;
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
            <div>
              {renderInput({
                fullWidth: true,
                classes,
                InputProps: getInputProps({
                  name: 'AffiliationCompany',
                  onChange: this.handleInputChange,
                  onKeyDown: this.handleKeyDown,
                  onBlur: handleBlur,
                  placeholder: 'Search',
                  error: checkForSectionErrors(touched, errors, [
                    'AffiliationCompany',
                  ]),
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }),
              })}
              {checkForSectionErrors(touched, errors, [
                'AffiliationCompany',
              ]) && (
                <FormHelperText error>
                  {errors.AffiliationCompany}
                </FormHelperText>
              )}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions({
                    value: inputValue2,
                    data: companies,
                  }).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,

                      itemProps: getItemProps({
                        item: suggestion,
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

export default props => (
  <StaticQuery
    query={graphql`
      query SearchCompanyListQuery {
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
    render={data => <CompanySearch data={data} {...props} />}
  />
);
