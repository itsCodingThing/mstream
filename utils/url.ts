const env = process.env.NODE_ENV;

export const url = env === "development" ? "http://localhost:1729/api" : "https://mstream-node.herokuapp.com/api";
export const graphqlURL =
    env === "development" ? "http://localhost:1729/graphql" : "https://mstream-node.herokuapp.com/graphql";
