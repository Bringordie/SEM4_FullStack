import mongoose from "mongoose";
const CONNECTION =
  "mongodb+srv://mongodb:mongodbpw@fullstack-cluster.601hh.mongodb.net/graphsql_test?retryWrites=true";
//const DB_NAME = "graphsql_test";
mongoose.connect(CONNECTION, {
  useUnifiedTopology: true,
  useNewURLParser: true,
});

const friendSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  language: {
    type: String,
  },
  email: {
    type: String,
  },
  contacts: {
    type: Array,
  },
});

const Friends = mongoose.model("friends", friendSchema);

export { Friends };
