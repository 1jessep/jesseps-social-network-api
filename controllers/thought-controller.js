const { Thought, User } = require("../models");

//gets all thoughts
const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //gets single thought by ID
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then((dbThoughtData) => {
        !dbThoughtData
          ? res.status(404).json({
              message: "Thought does not exist",
            })
          : res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //creates new thought
  createNewThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findByIdAndUpdate(
          req.body.userId,
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //updates / edits existing thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "Cannot find thought. Try a different ID." });
        } else {
          res.json(dbThoughtData);
        }
      })
      .catch((err) => res.json(err));
  },

  //deletes single thought by ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((dbThoughtData) => {
        !dbThoughtData
          ? res.status(404).json({
              message: "Cannot find Thought.",
            })
          : res.status(200).json;
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //allows to create reaction to existing thought
  createNewReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        !dbThoughtData
          ? res
              .status(404)
              .json({ message: "Cannot find Thought. Try a different ID." })
          : res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  //deletes single reaction from thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }
    )
      .then((dbThoughtData) => {
        !dbThoughtData
          ? res.status(404).json({
              message: "Cannot find Thought/Reaction.",
            })
          : res.status(200).json({
              message: "Reaction deleted.",
            });
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
