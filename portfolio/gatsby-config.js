module.exports = {
  siteMetadata: {
    url: process.env.SITE_URL,
    title: 'Umihiko',
    description:
      '天沼海彦のプロフィール兼ブログ。プログラミングや日常のことについて書いてあります。',
    image: `${process.env.SITE_URL}/umihiko_index.jpg`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GA_TRACKING_ID],
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
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
    `gatsby-plugin-react-helmet`,
  ],
};
