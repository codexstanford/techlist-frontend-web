export default theme => ({
  mainFeaturedPost: {
    backgroundColor: '#544948',
    color: theme.palette.common.white,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
  mainFeaturedPostContentSmall: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  mainFeaturedPostContentSmallSub: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: '12px',
      fontSize: '1rem',
    },
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    alignSelf: 'stretch',
    flex: 1,
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    objectFit: 'cover',
    alignItems: 'stetch',
  },
});
