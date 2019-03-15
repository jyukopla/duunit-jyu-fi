import Helmet from 'react-helmet';
import React from 'react';

import { StaticQuery, graphql } from 'gatsby';

import '../styles/index.scss';

const NotFoundPage = () => (
  <StaticQuery
    query={graphql`
      query NotFoundPageLayoutQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={({ site }) => (
      <>
        <Helmet title={site.siteMetadata.title} />
        <div
          className="d-flex flex-row align-items-center justify-content-center"
          style={{ height: '100vh' }}
        >
          <p>404 Not found</p>
        </div>
      </>
    )}
  />
);

export default NotFoundPage;
