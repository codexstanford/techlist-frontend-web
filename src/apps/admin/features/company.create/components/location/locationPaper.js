import React from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from '../../../../config/styles';

const LocationPaper = ({
  classes,
  suggestions,
  highlightedIndex,
  selectedItem,
  getItemProps,
  renderSuggestion,
  ...props
}) => {
  return (
    <Paper
      className={classes.paper}
      style={{ marginTop: 32, minHeight: 86 }}
      elevation={1}
    >
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
    </Paper>
  );
};

export default withStyles(styles)(LocationPaper);
