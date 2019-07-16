export default theme => ({
  mainFeaturedPost: {
    backgroundColor: '#544948',
    color: theme.palette.common.white,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 2}px`,

    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing.unit * 6}px`,
    },
  },
  mainFeaturedPostContentSmall: {
    paddingTop: '12px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
  },
  mainFeaturedPostContentSmallSub: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: '12px',
      fontSize: '.9rem',
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
