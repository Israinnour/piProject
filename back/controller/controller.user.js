const Users = require("../models/model.user");
const Companies = require("../models/model.company");
const updatePassword = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    const match = await user.matchPassword(req.body.password);
    if (!match) return res.status(400).json({ error: "wrong password" });
    user.password = req.body.newPassword;
    await user.save();
    return res.status(200).json("password updated");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { role, email } = req;
    const id = req.params.id;
    if (role == "user" || role == "expert") {
      await Users.findByIdAndUpdate(id, req.body);
      return res.status(200).json("profile updated");
    }
    if (role == "company") {
      await Companies.findByIdAndUpdate(id, req.body);
      return res.status(200).json("profile updated");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateCoverPhoto = async (req, res) => {
  try {
    const { id, role, email } = req;
    if (role == "user" || role == "expert") {
      await Users.findByIdAndUpdate(id, { coverPhoto: req.file.path });
      return res.status(200).json("cover photo updated");
    }
    if (role == "company") {
      await Companies.findByIdAndUpdate(id, { coverPhoto: req.file.path });
      return res.status(200).json("cover photo updated");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updatePicture = async (req, res) => {
  try {
    const { id, role, email } = req;
    if (role == "user" || role == "expert") {
      await Users.findByIdAndUpdate(id, { picture: req.file.path });
      return res.status(200).json("picture updated");
    }
    if (role == "company") {
      await Companies.findByIdAndUpdate(id, { picture: req.file.path });
      return res.status(200).json("picture updated");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateCV = async (req, res) => {
  try {
    const { id, role, email } = req;
    if (role == "user" || role == "expert") {
      await Users.findByIdAndUpdate(id, { cv: req.file.path });
      return res.status(200).json("cv updated");
    } else return res.status(403).json("Access denied");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const followUser = async (req, res) => {
  const id = req.params.id;
  const { currentId } = req.body;
  console.log(id, currentId)
  if (currentId === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await Users.findById(id);
      const followingUser = await Users.findById(currentId);

      if (!followUser.followers.includes(currentId)) {
        await followUser.updateOne({ $push: { followers: currentId } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("you are already following this id");
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }
};

// Unfollow a User
// changed
 const unfollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentId } = req.body;

  if(currentId === id)
  {
    res.status(403).json("Action Forbidden")
  }
  else{
    try {
      const unFollowUser = await Users.findById(id)
      const unFollowingUser = await Users.findById(currentId)


      if (unFollowUser.followers.includes(currentId))
      {
        await unFollowUser.updateOne({$pull : {followers: currentId}})
        await unFollowingUser.updateOne({$pull : {following: id}})
        res.status(200).json("Unfollowed Successfully!")
      }
      else{
        res.status(403).json("You are not following this User")
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
};

module.exports = {
  updatePassword,
  updateProfile,
  updateCoverPhoto,
  updatePicture,
  updateCV,
  followUser,
  unfollowUser,
};
