var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`
  type Query {
    ip: String
  }
`);

const loggingMiddleware = (req, res, next) => {
  console.log("ip:", req.ip);
  req.authenticated = Math.random() > 0.5;
  next();
};

var root = {
  ip: function (args, request) {
    if (!request.authenticated) {
      throw new Error("Not Authenticated");
    }
    return request.ip;
  },
};

var app = express();
app.use(loggingMiddleware);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
