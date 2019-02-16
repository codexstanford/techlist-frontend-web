import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import HeaderLeft from './header.left'
import HeaderCenter from './header.center'
import HeaderRight from './header.right'
import SecondaryHeader from './header.secondary'
import { withStyles } from '@material-ui/core/styles'
import mocks from './__mocks__'

export class Header extends React.Component {
  state = {
    isMenuOpen: false,
    isUserAuthenticated: false,
  }

  toggleMenu = () => {
    this.setState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen }))
  }

  handleUserAuthenticationAction = async () => {
    setTimeout(
      this.setState(prev => ({
        ...prev,
        isUserAuthenticated: !prev.isUserAuthenticated,
      })),
      300
    )
  }

  render() {
    const { siteTitle, classes, shouldShowSecondaryHeader = true } = this.props
    const { isMenuOpen, isUserAuthenticated } = this.state
    return (
      <React.Fragment>
        <AppBar color="primary" position="relative">
          <Toolbar className={classes.toolbarMain} color="primary">
            <HeaderLeft sections={mocks.headerLeftSectionMocks} />
            <HeaderCenter siteTitle={siteTitle} />
            <HeaderRight
              handleUserAuthenticationAction={
                this.handleUserAuthenticationAction
              }
              isUserAuthenticated={isUserAuthenticated}
            />
          </Toolbar>
          {shouldShowSecondaryHeader && (
            <SecondaryHeader sections={mocks.headerSecondaryMocks} />
          )}
        </AppBar>
      </React.Fragment>
    )
  }
}

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    // color: theme.palette.common.white,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default withStyles(styles)(Header)
