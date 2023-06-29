const UserModel = require("../module/userSchema");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const updateUser = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) {
      return res.status(400).json({
        data: undefined,
        message: "please provide user id",
      });
    }
    let { email, name, mobileNumber, gender, photoUrl } = req.body;
    const resImg = await cloudinary.uploader
      .upload(req?.files?.photoUrl?.tempFilePath)
      .then((data) => {
        return data;
      });
    let userData = await UserModel.findByIdAndUpdate(id, {
      name,
      email,
      mobileNumber,
      gender,
      photoUrl: resImg?.url,
    });

    console.log({ req });
    // for delete tmp folder image file structure while upload image
    fs.unlink(req?.files?.photoUrl?.tempFilePath, () => {});
    fs.rm(req?.files?.photoUrl?.tempFilePath, () => {});

    if (!userData) {
      return res.status(400).json({
        data: undefined,
        message: "user is not updated",
      });
    }
    res.status(200).json({
      data: userData,
      message: "User Updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: undefined,
      message: error,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userDetails = await UserModel.findById({
      _id: req.user?._id,
    });
    res.status(200).json({
      data: userDetails,
      message: "User details found successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};

module.exports = {
  updateUser,
  getUser,
};
