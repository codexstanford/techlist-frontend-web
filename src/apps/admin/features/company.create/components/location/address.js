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
import LocationPaper from './locationPaper';

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

function GoogleEnhancedAutocomplete({ classes, handleBlur, ...props }) {
  const [suggestions, setSuggestions] = React.useState([]);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (query.length >= 5) {
      const result = geocodeByAddress(query).then(results => {
        setSuggestions(results);
      });
    }
  }, [query]);

  async function handleSelection(suggestion) {
    const latlng = await getLatLng(suggestion);
    const { geometry } = suggestion;
    const { location } = geometry;
    const newLocation = Object.assign({}, location, {
      set: { location: { ...latlng } },
      lat: null,
      lng: null,
    });
    const newGeo = Object.assign({}, geometry, { ...newLocation });
    const result = Object.assign({}, suggestion, { geometry: { ...newGeo } });
    props.setFieldValue('locationjson', result, false);
  }

  return (
    <Downshift
      id="downshift-simple"
      itemToString={itemToString}
      onChange={handleSelection}
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
              onBlur: handleBlur,
            }),
          })}
          <div {...getMenuProps()}>
            {isOpen ? (
              <LocationPaper
                suggestions={suggestions}
                highlightedIndex={highlightedIndex}
                selectedItem={selectedItem}
                getItemProps={getItemProps}
                renderSuggestion={renderSuggestion}
              />
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

  return (
    <MenuItem
      key={suggestion.formated_address}
      {...itemProps}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
        color: '#000000',
        maxWidth: '100%',
        textAlign: 'center',
        whiteSpace: 'normal',
        padding: '30px 0',
      }}
    >
      {suggestion['formatted_address']}
    </MenuItem>
  );
}

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

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
