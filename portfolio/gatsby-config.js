module.exports = {
  siteMetadata: {
    siteUrl: process.env.SITE_URL,
    title: 'Umihiko',
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        fileName: 'types/graphql-types.d.ts',
        documentPaths: ['./src/**/*.{ts,tsx}', './gatsby-node.js'],
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: 'Portfolio',
        fieldName: 'portfolio',
        url: process.env.API_URL,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Umihiko',
        short_name: 'umihiko',
        start_url: '/',
        display: 'standalone',
        icon: './src/images/icon.png',
      },
    },
  ],
};
