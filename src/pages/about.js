import React from 'react';
import { Link } from 'gatsby';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import EventIcon from '@material-ui/icons/Event';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/layout';
import SEO from '../components/seo';

function AboutPage({ classes, ...rest }) {
  return (
    <Layout>
      <SEO title="About" />
      <main>
        <Grid container spacing={40} className={classes.mainGrid}>
          <Grid item md={12}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://www-cdn.law.stanford.edu/wp-content/uploads/2015/03/codex-5-1200x630.jpg"
                title="CodeX Stanford"
              />

              <CardContent>
                <Typography component="h1" variant="h5">
                  About
                </Typography>
                <Typography paragraph variant="subtitle2">
                  The LegalTech Index is hosted by Codex, the Stanford Center
                  for Legal Informatics.
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  History
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <EventIcon />
                    </ListItemIcon>

                    <ListItemText
                      primary="TechIndex Relaunch"
                      secondary="2019"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EventIcon />
                    </ListItemIcon>

                    <ListItemText
                      primary="TechIndex Founded"
                      secondary="2015"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="This project was conceived in 2015 at Code = Law, a group created by CodeX Fellow Pieter Gunst. Between 2012 and 2015, Code = Law brought together Stanford Law students interested in the intersection of law and technology. In addition to increasing the familiarity of the participants with legal technology in general, the group also engaged in more hands-on exercises, including coding exercises covering html, css, javascript and modern web frameworks. One of these exercises was the design and development of the initial framework of tech.law.stanford.edu. The database was then further populated and developed by the CodeX team and our CodeX interns and researchers" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  Contributors
                </Typography>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src="https://pbs.twimg.com/profile_images/1015202182575030274/4ySyJo4U_400x400.jpg" />
                  </ListItemAvatar>

                  <ListItemText
                    primary="Michael Joseph Edelman"
                    secondary="Lead Developer"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src="https://www.ugent.be/re/img/faculteit-rechten/personen/pietergunst.jpg" />
                  </ListItemAvatar>

                  <ListItemText
                    primary="Pieter Gunst"
                    secondary="Project Lead"
                  />
                </ListItem>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
}

const styles = theme => ({
  mainGrid: {
    marginTop: theme.spacing.unit * 1,
  },
  mainContent: {
    padding: `${theme.spacing.unit * 1}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
  card: {
    minWidth: 350,
    marginBottom: `${theme.spacing.unit * 1}px`,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

export default withStyles(styles)(AboutPage);
