import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { renderInput, renderSuggestion, getSuggestions } from './helpers';

export function Select({
  setFieldValue,
  classes,
  options,
  name = '',
  InputLabelProps,
  InputProps,
  label = '',
  placeholder = '',
  ...props
}) {
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState([]);

  React.useEffect(() => {
    setFieldValue(name, selectedItem, false);
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
    console.log(item);
    setInputValue(item.label);
    setSelectedItem(newSelectedItem);
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  return (
    <Downshift
      onChange={handleChange}
      selectedItem={selectedItem}
      inputValue={inputValue}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex,
      }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown,
          placeholder: placeholder,
        });
        return (
          <div>
            {renderInput({
              fullwidth: props.fullwidth || true,
              classes,
              name,
              label,
              InputLabelProps: getLabelProps(),
              InputProps: {
                onBlur,
                onChange: event => {
                  handleInputChange(event);
                  onChange(event);
                },
                onFocus,
              },
              inputProps,
            })}
            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue, options).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion }),
                    highlightedIndex,
                    selectedItem: selectedItem,
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

export default Select;
