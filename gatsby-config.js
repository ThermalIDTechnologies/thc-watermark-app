module.exports = {
  siteMetadata: {
    title: `THC Solutions Watermark App`,
    description: `Watermark images for THC Solutions.`,
    author: `@`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `thc-image-watermarking-app`,
        short_name: `thc-watermark-app`,
        start_url: `/`,
        background_color: `#4a7729 `,
        theme_color: `#4a7729 `,
        display: `minimal-ui`,
        icon: `src/images/thc-logo@300x.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-styled-components`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
