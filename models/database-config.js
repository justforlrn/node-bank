require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://justforlrn:<password>@cluster0.7iieh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//username:password@host:port/database?options...
mongodb: module.exports = {
  database: `mongodb+srv://justforlrn:${process.env.DATABASE_PASSWORD}@cluster0.7iieh.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
};
