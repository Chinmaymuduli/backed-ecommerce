const UserModel = require("../module/userSchema");

const deleteController = async (req, res) => {
  try {
    let { id } = req.body;
    let userData = await UserModel.findByIdAndDelete(id);
    if (!userData) {
      return res.status(400).json({
        data: undefined,
        message: "user could not deleted",
      });
    }
    res.status(200).json({
      data: undefined,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: undefined,
      message: error,
    });
  }
};
module.exports = deleteController;
