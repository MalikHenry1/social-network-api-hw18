const {connect, connection } = require("mongoose");

const connection = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-network";

connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;