module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.yourdomain.tld',
    title: 'Portfolio',
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
        url: 'http://localhost:8000/graphql/portfolio',
        mapping: { markdown: 'text/markdown' },
      },
    },
  ],
};
