const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createNewThought,
  updateThought,
  deleteThought,
  createNewReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post(createNewThought);

router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(createNewReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
