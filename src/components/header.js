import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { fade } from '@material-ui/core/styles/colorManipulator'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'

const sections = [
  'Marketplace',
  'Document Automation',
  'Practice Management',
  'Legal Research',
  'Legal Education',
  'Online Dispute Resolution',
  'E-Discovery',
  'Analytics',
  'Compliance',
]

const HeaderLeft = props => {
  const { classes } = props
  return (
    <React.Fragment>
      <Button color="inherit" size="small">
        Home
      </Button>
      <Button color="inherit" size="small">
        About
      </Button>
      <Button color="inherit" size="small">
        Statistics
      </Button>
    </React.Fragment>
  )
}

const HeaderCenter = props => {
  const { classes, siteTitle } = props
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 2 }}>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        className={classes.title}
        style={{
          fontWeight: '700',
          letterSpacing: '-.5px',
        }}
        noWrap
      >
        {siteTitle}
      </Typography>
    </div>
  )
}

const HeaderRight = props => {
  const { classes, handleAuthenticationRequest, isUserAuth } = props

  return (
    <React.Fragment>
      <div className={classes.sectionDesktop}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
      </div>
      {isUserAuth ? (
        <React.Fragment>
          <IconButton
            // aria-owns={isMenuOpen ? "material-appbar" : undefined}
            aria-haspopup="true"
            onClick={handleAuthenticationRequest}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleAuthenticationRequest}
            style={{
              marginLeft: '10px',
            }}
          >
            Login
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

class Header extends React.Component {
  state = {
    isMenuOpen: false,
    isUserAuth: false,
  }

  toggleMenu = () => {
    this.setState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen }))
  }

  toggleAuth = () => {
    this.setState(prev => ({ ...prev, isUserAuth: !prev.isUserAuth }))
  }

  render() {
    const { siteTitle, classes, ...rest } = this.props
    return (
      <React.Fragment>
        <div className={classes.layout}>
          <AppBar color="primary" position="absolute">
            <Toolbar className={classes.toolbarMain} color="primary">
              <HeaderLeft {...this.props} />
              <HeaderCenter {...this.props} />
              <HeaderRight
                toggleMenu={this.toggleMenu}
                handleAuthenticationRequest={this.toggleAuth}
                isUserAuth={this.state.isUserAuth}
                {...this.props}
              />
            </Toolbar>
            <Toolbar variant="dense" className={classes.toolbarSecondary}>
              {sections.map(section => (
                <Typography
                  color="inherit"
                  variant="caption"
                  noWrap
                  key={section}
                >
                  {section}
                </Typography>
              ))}
            </Toolbar>
          </AppBar>
        </div>
      </React.Fragment>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
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
  layout: {
    width: 'auto',
    // color: theme.palette.common.black,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export default withStyles(styles)(Header)
