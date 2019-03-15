import Helmet from 'react-helmet';
import React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import '../styles/index.scss';
import { deserialize } from 'react-serialize';
// import { deserialize } from 'react-serialize';

const Header = ({ logo }) => (
  <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white text-blue border-bottom box-shadow">
    <h5 className="my-0 mr-md-auto font-weight-normal d-flex flex-row align-items-center">
      <Img fixed={logo} />
    </h5>
    <nav className="my-2 my-md-0 mr-md-3">
      <a className="p-2 text-black" href="#one">
        Lorem
      </a>
      <a className="p-2 text-black" href="#two">
        Ipsum
      </a>
      <a className="p-2 text-black" href="#three">
        Dolor
      </a>
      <a className="p-2 text-black" href="#four">
        Sit amet
      </a>
    </nav>
  </div>
);

const Row = ({ node }) => (
  <div className="row">
    <div className="col-12">
      <h5 className="card-title">{node.title}</h5>
      {deserialize(node.text.react, {
        components: {
          Link: <></>,
          Img: <></>,
        },
      })}
    </div>
  </div>
);

const Card = ({ node }) => (
  <div
    className="card d-flex flex-column flex-lg-row align-items-center justify-content-center mb-4 p-4"
    style={{ minWidth: '30vw' }}
  >
    {node.image ? (
      <Img
        className="card-img-top"
        fixed={node.image.childImageSharp.fixed}
        alt="card image cap"
        style={{ minWidth: '200px' }}
      />
    ) : null}
    <div className="card-body">
      <h5 className="card-title">{node.title}</h5>
      <p className="card-text">{node.description}</p>
    </div>
  </div>
);

const sortByFolderOrder = data => {
  const { allPloneSite, allPloneFolder, allPloneDocument } = data;

  let ids = allPloneSite.edges[0].node.items.map(item => item._id);
  for (const folder of allPloneFolder.edges) {
    let idx = ids.indexOf(folder.node.id);
    if (idx !== -1) {
      for (const item of folder.node.items) {
        ids.splice(idx + 1, 0, item._id);
        idx = idx + 1;
      }
    } else {
      for (const item of folder.node.items) {
        ids.push(item._id);
      }
    }
  }
  allPloneDocument.edges.sort(
    (a, b) => ids.indexOf(a.node.id) - ids.indexOf(b.node.id)
  );
};

const IndexPage = ({ location, data }) => {
  const { file, site, allPloneDocument } = data;

  sortByFolderOrder(data);

  return (
    <>
      <Helmet title={site.siteMetadata.title} />
      <Header logo={file.childImageSharp.fixed} />
      <div className="container">
        <div className="card-deck">
          {allPloneDocument.edges.map(
            edge =>
              edge.node.subjects.indexOf('rivi') !== -1 ? (
                <Row node={edge.node} />
              ) : (
                <Card node={edge.node} />
              )
          )}
        </div>
      </div>
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allPloneSite {
      edges {
        node {
          id
          items {
            _id
          }
        }
      }
    }
    allPloneFolder {
      edges {
        node {
          id
          items {
            _id
          }
        }
      }
    }
    allPloneDocument {
      edges {
        node {
          ...Document
        }
      }
    }
    file(relativePath: { eq: "logo.png" }) {
      publicURL
      childImageSharp {
        fixed(height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
  fragment Document on PloneDocument {
    id
    title
    description
    subjects
    text {
      react
    }
    image {
      childImageSharp {
        fixed(width: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    _path
  }
`;
