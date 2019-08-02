import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

export function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem,
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  console.log('suggestion', suggestion);
  return (
    <MenuItem
      {...itemProps}
      key={suggestion.name}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.person
        ? `${suggestion.person.name[0].firstName} ${suggestion.person.name[0].lastName}`
        : suggestion.name[0].payload}
    </MenuItem>
  );
}
