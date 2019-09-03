import { fade } from '@material-ui/core/styles/colorManipulator';

export const styles = theme => ({
  layout: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  headerAppBar: {
    display: 'flex',
    alignItems: 'space-between',
    flexDirection: 'column',
    zIndex: 1300,
    boxShadow: 'none',
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  inputRoot: {
    color: 'primary',
    width: '100%',
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`,
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 400,
      '&:focus': {
        width: 500,
      },
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
