import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

export function HeaderCenter(props) {
  const { siteTitle, classes } = props

  return (
    <div className={classes.wrapper}>
      {siteTitle && (
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
      )}
    </div>
  )
}

HeaderCenter.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

const styles = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 2,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
})

export default withStyles(styles)(HeaderCenter)
