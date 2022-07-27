const { User, Thought } = require("../models");
const { getRandUsername, getRandEmail } = require("./data");
const mongoose = require('mongoose');


const connection = mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");

    await Thought.deleteMany({});

    await User.deleteMany({});

    const users = [];

    for (let i=0; i<20; i++) {
        const username = getRandUsername();
        const email = getRandEmail();

        if(
            users.filter((evt) => evt.username === username).length === 0 &&
            users.filter((evt) => evt.email === email).length === 0
         ) {
            users.push({username: username, email: email});
        }
    }

    await User.collection.insertMany(users);
})

