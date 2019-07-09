import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import formatCategory from './formatCategory';

export function renderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem,
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      value={suggestion.value}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {formatCategory(suggestion.label)}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

export default renderSuggestion;
