import dotenv from "dotenv";
import type { GatsbyConfig } from "gatsby";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Borg Plays`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-source-custom-api ",
      options: { hostUrl: process.env.HOST_URL },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-transform-react-jsx",
  ],
};

export default config;
