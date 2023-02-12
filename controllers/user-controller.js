const { Thought, User } = require("../models");

//gets all users
const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //gets single user by ID
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //creates new user
  createNewUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //deletes a single user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // updates / edits existing user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            message: "Cannot find User!",
          });
        } else {
          res.status(200).json({
            message: "User updated!",
            user: dbUserData,
          });
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  //allows to add friend to existing user's friends list
  addNewFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.id,
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            message: "Cannot find User with this id.",
          });
        } else {
          res.json(dbUserData);
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  //deletes single friend from existing user's friends list
  deleteFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            message: "Cannot find User with this id.",
          });
        } else res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
