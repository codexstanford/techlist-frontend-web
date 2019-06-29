import React from 'react';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { makeStyles, withTheme } from '@material-ui/styles';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const itemToString = item => (item ? item.formatted_address : '');

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250,
    color: 'black',
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: '1rem',
    left: 0,
    right: 0,
  },
  chip: {
    margin: '1rem',
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: '1rem',
  },
}));

function GoogleEnhancedAutocomplete({ classes }) {
  const [suggestions, setSuggestions] = React.useState([]);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (query.length >= 5) {
      const result = geocodeByAddress(query).then(results => {
        setSuggestions(results);
      });
    }
  }, [query]);

  return (
    <Downshift
      id="downshift-simple"
      itemToString={itemToString}
      onChange={selection => console.log('SELECTED:', selection)}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        highlightedIndex,
        inputValue,
        isOpen,
        selectedItem,
      }) => (
        <div>
          {renderInput({
            fullWidth: true,
            classes,
            InputProps: getInputProps({
              placeholder: 'Enter company address',
              onChange: event => setQuery(event.target.value),
            }),
          })}
          <div {...getMenuProps()}>
            {isOpen ? (
              <Paper className={classes.paper} square>
                {suggestions.map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({
                      item: suggestion,
                    }),
                    highlightedIndex,
                    selectedItem,
                  })
                )}
                }
              </Paper>
            ) : null}
          </div>
        </div>
      )}
    </Downshift>
  );
}

function renderSuggestion(suggestionProps = {}) {
  const {
    index,
    suggestion,
    highlightedIndex,
    selectedItem,
    itemProps,
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected =
    (selectedItem || '').indexOf(suggestion.formated_address) > -1;

  console.log(suggestion);
  return (
    <MenuItem
      {...itemProps}
      key={suggestion.formated_address}
      selected={isHighlighted}
      component="div"
      style={{ fontWeight: isSelected ? 500 : 400, color: '#000000' }}
    >
      {suggestion['formatted_address']}
    </MenuItem>
  );
}

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;
  console.log(other);

  return (
    <div>
      <Field
        name="location"
        label="Company Location"
        type="text"
        component={TextField}
        fullWidth
        InputProps={{
          inputRef: ref,
          ...InputProps,
        }}
        {...other}
      />
    </div>
  );
}

export default withTheme(GoogleEnhancedAutocomplete);
