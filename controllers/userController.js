const {User, Thought} = require("../models");

const userController = {

    // Get All Users
getUsers(req, res) {
    User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
},

// Get a Single User
getUserById({ params }, res) {
    User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No user was found at this ID.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},

// Create a Single user
createUser({ body }, res) {
    User.create(body)
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},

// Update a Single User
updateUser({params, body}, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user was found at this ID.' })
            }

            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},

// Delete a Single User
deleteUser({ params }, res) {
    User.findByIdAndDelete({ _id: params.id })
    .then(dbUserData => {
        dbUserData.thoughts.forEach(thought => {
            Thought.findOneAndDelete({ _id: thought })
                .then(dbThoughtData => {
                    if (!dbThoughtData) {
                        res.status(500).json({ message: 'An unexpected error occurred.' });
                        return;
                    }

                    res.json(dbUserData)
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err);
                });
        })
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},

// Add a Friend to A User
addFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true }
    )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found at this id!' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},

// Delete a Friend from a User
deleteFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
    )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found at this id!' });
                return;
            }

            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
}

};

module.exports = userController;

