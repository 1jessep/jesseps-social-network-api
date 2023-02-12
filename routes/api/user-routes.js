const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUser,
  updateUser,
  addNewFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(createNewUser);

router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser);

router.route("/:id/friends/:friendId").post(addNewFriend).delete(deleteFriend);

module.exports = router;
