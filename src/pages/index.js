import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';

import ListItemText from '@material-ui/core/ListItemText';
import LandingHero from '../features/landinghero';
import { withStyles } from '@material-ui/core/styles';

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
        <LandingHero data={props.data} />

        <Grid container spacing={40} className={classes.mainGrid}>
          <Grid item md={8}>
            <Paper className={classes.newsList}>
              <Typography component="h2" variant="h6" gutterBottom>
                Breaking
              </Typography>
              <Divider />
              <List>
                {otherArticles &&
                  otherArticles.map(({ node }) => {
                    return (
                      <ListItem>
                        <ListItemText
                          primary={<Link href={node.link}>{node.title}</Link>}
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
              <Typography component="h2" variant="h6" gutterBottom>
                Trending
              </Typography>
              <Divider />
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
    marginTop: theme.spacing.unit * 2,
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
