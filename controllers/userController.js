const {User, Thought} = require("../models");

const userController = {

getUsers(req, res) {
    User.find({})
        .populate({
            path: "thoughts",
            select: '-__v'
        })

}

}

