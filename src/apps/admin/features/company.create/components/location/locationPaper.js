import React from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  paper: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
    // [theme.breakpoints.up(450 + theme.spacing.unit * 3 * 2)]: {
    //   marginTop: theme.spacing.unit * 8,
    // },
  },
});

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
