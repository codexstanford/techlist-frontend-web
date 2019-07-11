import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import { StaticQuery, graphql } from 'gatsby';
import { renderInput, renderSuggestion, getSuggestions } from './helpers';
import formatCategory from './helpers/formatCategory';

export function DownshiftMultiple(props) {
  const { classes, options, setFieldValue, handleBlur } = props;
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState([]);

  React.useEffect(() => {
    setFieldValue('categories', selectedItem, false);
  }, [selectedItem]);

  function handleKeyDown(event) {
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === 'Backspace'
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleChange(item) {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue('');
    setSelectedItem(newSelectedItem);
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  return (
    <Downshift
      id="downshift-multiple"
      inputValue={inputValue}
      onChange={handleChange}
      selectedItem={selectedItem}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue: inputValue2,
        selectedItem: selectedItem2,
        highlightedIndex,
      }) => {
        const { onChange, onFocus, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown,
          placeholder: 'Select multiple categories',
        });

        return (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              name: 'categories',
              label: 'Categories',
              InputLabelProps: getLabelProps(),
              InputProps: {
                onChange: event => {
                  handleInputChange(event);
                  onChange(event);
                },
                onBlur: handleBlur,
                onFocus,
              },
              inputProps,
            })}

            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue2, options).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion }),
                    highlightedIndex,
                    selectedItem: selectedItem2,
                  })
                )}
              </Paper>
            ) : null}
            <div style={{ marginTop: 10 }}>
              {selectedItem.map(item => (
                <Chip
                  key={item.label}
                  tabIndex={-1}
                  label={item.label && formatCategory(item.label)}
                  className={classes.chip}
                  onDelete={handleDelete(item)}
                  style={{
                    margin: '.25rem .25rem',
                  }}
                />
              ))}
            </div>
          </div>
        );
      }}
    </Downshift>
  );
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.object.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minHeight: 70,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: '.5rem',
    left: 0,
    right: 0,
  },
  chip: {
    margin: '.5rem 1rem',
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: '2rem',
  },
}));

let popperNode;

function IntegrationDownshift(props) {
  const classes = useStyles();

  const { setFieldValue, handleBlur } = props;

  const { organizationCategories } = props.data.allTechList;

  return (
    <div className={classes.root}>
      <DownshiftMultiple
        handleBlur={handleBlur}
        classes={classes}
        options={organizationCategories.map(item => ({
          label: item.payload,
          value: item.id,
        }))}
        setFieldValue={setFieldValue}
      />
    </div>
  );
}

export const Categories = props => (
  <StaticQuery
    query={graphql`
      query CategoryDropdownListQuery {
        allTechList {
          organizationCategories {
            id
            payload
          }
        }
      }
    `}
    render={data => <IntegrationDownshift data={data} {...props} />}
  />
);
