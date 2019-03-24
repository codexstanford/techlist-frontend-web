import React from 'react';
import { Link as GatsbyLink, graphql } from 'gatsby';
import Link from '@material-ui/core/Link';
import DomainIcon from '@material-ui/icons/Domain';
import Layout from '../../components/layout';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import SEO from '../../components/seo';
import ListItemText from '@material-ui/core/ListItemText';
import ReactTable, { useReactTable } from 'react-table';
import 'react-table/react-table.css';

const IndexPage = props => {
  const { classes } = props;
  const { row, root } = classes;

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className={root}>
        <ReactTable
          columns={[
            {
              Header: 'Name',
              accessor: edge => edge.node.context,
              id: edge => edge.node.context.id,
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
                        props.value && props.value.name ? props.value.name : ''
                      }
                    />
                  </ListItem>
                );
              },
            },
            {
              Header: '',
              accessor: edge => edge.node.context,
              id: edge => edge.node.context.id,
              Cell: props => {
                return (
                  <ListItem
                    button
                    component={Link}
                    href={props.value && props.value.url ? props.value.url : ''}
                  >
                    <DomainIcon />
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
}))(IndexPage);

export const pageQuery = graphql`
  query IndexPageQuery {
    allSitePage {
      edges {
        node {
          path
          jsonName
          context {
            id
            name
            slug
            url
            twitter
          }
        }
      }
    }
  }
`;
