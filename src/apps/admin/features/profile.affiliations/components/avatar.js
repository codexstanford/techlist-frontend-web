import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  iconAvatar: {
    margin: theme.spacing(1),
    width: 60,
    height: 60,
  },
  letterAvatar: {
    margin: 10,
    width: 60,
    height: 60,
    backgroundColor: '#b1040e',
  },
  listItem: {
    alignSelf: 'flex-start',
  },
}));

export function AffiliationAvatar({ affiliation }) {
  const { organization } = affiliation;
  const { logo, name } = organization;
  const firstInitial = name[0].payload.slice(0, 1);
  const classes = useStyles();
  return (
    <>
      {logo && logo.length > 0 ? (
        <Avatar src={logo[0].payload} className={classes.iconAvatar} />
      ) : (
        <Avatar className={classes.letterAvatar}>{firstInitial}</Avatar>
      )}
    </>
  );
}
