module.exports = {
  siteMetadata: {
    title: `effectsjs`,
    description: `Algebraic Effects in Javascript`,
    author: `@cdaringe`
  },
  plugins: [
    "gatsby-plugin-remove-serviceworker",
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-workerize-loader",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `files`,
        path: `${__dirname}/src/`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    process.env.NODE_ENV === "development"
      ? "gatsby-plugin-webpack-bundle-analyser-v2"
      : null,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Ubuntu Mono`],
        display: "swap"
      }
    }
    // `gatsby-plugin-preact`, doesnt work due to highlight.js required react-dom directly
  ].filter(Boolean)
};