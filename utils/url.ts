const env = process.env.NODE_ENV;

export const url = env === "development" ? "http://localhost:1729" : "https://mstream-node.herokuapp.com";
