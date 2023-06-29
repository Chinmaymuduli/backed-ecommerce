const { Types } = require("mongoose");
const ProductCartModel = require("../module/cartSchema");

exports.createAddToCart = async (req, res) => {
  try {
    let { productId, userId } = req.body;
    console.log({ productId, userId });
    let cartData = new ProductCartModel({ productId, userId });
    let cartProduct = await cartData.save();
    console.log(cartProduct);
    if (!cartProduct) {
      return res.status(400).json({
        message: "Failed to cart",
        status: 400,
      });
    }
    return res.status(200).json({
      data: cartProduct,
      message: "Cart added successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to cart",
      status: 400,
    });
  }
};

// get Cart

exports.getCartProduct = async (req, res) => {
  try {
    // const getProduct = await ProductCartModel.aggregate([
    //   {
    //     $lookup: {
    //       from: "products",
    //       as: "product",
    //       foreignField: "_id",
    //       localField: "productId",
    //     },
    //   },
    //   {
    //     $match: {
    //       $expr: {
    //         userId: new Types.ObjectId(req?.params?.id),
    //       },
    //     },
    //   },
    // ]);
    const getProduct = await ProductCartModel.find({
      userId: req.params.id,
    })
      .populate("productId")
      .exec(function (err, products) {
        res.status(200).json({
          data: products,
          status: 200,
          message: "Cart items get successfully",
        });
      });
  } catch (error) {
    res.status(400).json({
      message: "Cart items not found",
      status: 400,
    });
  }
};
