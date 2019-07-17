import React from 'react';
import { Link as GatsbyLink, graphql } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Layout from '../../components/layout';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import SEO from '../../components/seo';
import ListItemText from '@material-ui/core/ListItemText';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const IndexPage = props => {
  const { classes } = props;
  const { root } = classes;
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className={root}>
        <ReactTable
          className="-striped -highlight"
          resolveData={data => {
            return data
              .filter(
                item => item.node.context && item.node.context.name !== null
              )
              .map(item => ({
                name: item.node.context.name,
                id: item.node.context.id,
                slug: item.node.context.slug,
                description: item.node.context.description,
              }));
          }}
          defaultSorted={[
            {
              id: 'name',
              desc: false,
            },
          ]}
          filterable
          defaultFilterMethod={(filter, row) => {
            if (
              row[filter.id].name === undefined ||
              row[filter.id].name === null
            ) {
              return false;
            }
            return row[filter.id].name.split(' ').includes(filter.value);
          }}
          columns={[
            {
              Header: () => <Typography variant="h6">Companies</Typography>,
              accessor: edge => edge,
              id: edge => edge.id,

              Cell: props => {
                return (
                  <ListItem
                    button
                    component={GatsbyLink}
                    to={`/companies/${
                      props.value && props.value.slug ? props.value.slug : ''
                    }`}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1">
                          {props.value && props.value.name
                            ? props.value.name
                            : ''}
                        </Typography>
                      }
                      secondary={
                        props.value && props.value.description ? (
                          <>
                            <Typography
                              component="span"
                              variant="caption"
                              className={classes.inline}
                            >
                              {props.value.description.split(' ').length <= 7
                                ? props.value.description
                                : props.value.description
                                    .split(' ')
                                    .slice(0, 7)
                                    .join(' ') + ' ...'}
                            </Typography>
                          </>
                        ) : (
                          ''
                        )
                      }
                    />
                  </ListItem>
                );
              },
            },
          ]}
          getTdProps={() => {
            return {
              style: {
                color: '#333',
              },
            };
          }}
          getTrProps={() => {
            return {
              style: {
                width: '100%',
              },
            };
          }}
          data={props.data.allSitePage.edges}
        />
      </div>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }} />
    </Layout>
  );
};

export default withStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: '1rem',
    color: '#333',
  },
  row: {
    width: '100%',
  },
  inline: {
    display: 'inline',
  },
}))(IndexPage);

export const pageQuery = graphql`
  query IndexPageQuery {
    allSitePage {
      edges {
        node {
          path

          context {
            id
            name
            slug
            url
            twitter
            description
            data
          }
        }
      }
    }
  }
`;
