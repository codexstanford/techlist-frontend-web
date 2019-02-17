import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

import mocks from '../components/header/__mocks__';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const IndexPage = props => {
  const { classes } = props;
  const { allNews } = props.data;

  const [
    firstArticle,
    secondArticle,
    thirdArticle,
    ...otherArticles
  ] = allNews.edges;
  return (
    <Layout>
      <SEO title="Home" keywords={[`CodeX`, `LegalTech`, `Index`]} />
      <main>
        <Paper className={classes.mainFeaturedPost}>
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainFeaturedPostContent}>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  {firstArticle.node.title}
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  {firstArticle.node.description}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={40} className={classes.cardGrid}>
          {[secondArticle, thirdArticle].map(({ node }) => (
            <Grid item key={node.title} xs={12} md={6}>
              <Card className={classes.card} dense>
                <div className={classes.cardDetails}>
                  <CardContent>
                    <Typography component="h2" variant="h6">
                      {node.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {node.date}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {node.content
                        .replace(/<[^>]*>/, ' ')
                        .split(' ')
                        .slice(0, 50)
                        .join(' ')}
                    </Typography>
                  </CardContent>
                </div>
                <Hidden xsDown>
                  <CardMedia
                    className={classes.cardMedia}
                    image={node.imageUrl}
                    title="Image title"
                  />
                </Hidden>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={40} className={classes.mainGrid}>
          <Grid item md={8}>
            <Paper className={classes.newsList}>
              <Typography component="h2" variant="h4" gutterBottom>
                News
              </Typography>
              <Divider />
              <List>
                {otherArticles &&
                  otherArticles.map(({ node }) => {
                    return (
                      <ListItem>
                        <ListItemText
                          primary={node.title}
                          secondary={node.content}
                        />
                      </ListItem>
                    );
                  })}
              </List>
            </Paper>
          </Grid>
          <Grid item md={4}>
            <Paper className={classes.newsList}>
              <Typography component="h2" variant="h4" gutterBottom>
                Trending
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
};

const styles = theme => ({
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
  mainGrid: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  newsList: {
    padding: `${theme.spacing.unit * 2}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
});

export default withStyles(styles)(IndexPage);

export const pageQuery = graphql`
  query HomePageQuery {
    allNews(limit: 10) {
      edges {
        node {
          id
          imageUrl
          description
          title
          pubDate
          author
          sourceName
          link
          imageUrl
          content
        }
      }
    }
    allSitePage {
      edges {
        node {
          path
          jsonName
          context {
            id
            name
          }
        }
      }
    }
  }
`;
