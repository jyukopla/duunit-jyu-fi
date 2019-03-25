require('dotenv').config({
  path: '.secrets',
});

module.exports = {
  siteMetadata: {
    title: 'DuunIT',
  },
  plugins: [
    {
      resolve: 'gatsby-source-plone',
      options: {
        baseUrl: 'https://duunit.jyu.fi/fi/2019',
        searchParams: {
            portal_type: [
                'Document',
                'File',
                'Folder',
                'Image',
            ],
        },
        token: process.env.TOKEN,
        logLevel: 'DEBUG',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/static`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'DuunIT',
        short_name: 'DuunIT',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#002957',
        display: 'standalone',
        icon: './src/static/icon.png',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
};
