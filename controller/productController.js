const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const ProductModel = require("../module/productSchema");

exports.createProduct = async (req, res) => {
  let { title, description, price, rating, stock, brand, category, thumbnail } =
    req.body;

  const resImg = await cloudinary.uploader
    .upload(req?.files?.thumbnail?.tempFilePath)
    .then((data) => {
      return data;
    });

  let newProduct = new ProductModel({
    title,
    description,
    price,
    rating,
    stock,
    brand,
    category,
    thumbnail: resImg?.url,
  });
  let productSaved = await newProduct.save();

  // for delete tmp folder image file structure while upload image
  fs.unlink(req?.files?.thumbnail?.tempFilePath, () => {});
  fs.rm(req?.files?.thumbnail?.tempFilePath, () => {});

  if (!productSaved) {
    return res.status(400).json({
      data: undefined,
      message: "Product create failed",
    });
  }
  return res.status(200).json({
    data: productSaved,
    message: "Product created successfully",
    status: 200,
  });
};
exports.getProducts = async (req, res) => {
  const allProduct = await ProductModel.find();
  const data = res.json(allProduct);
};
exports.getProductsById = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Not Found",
        status: 404,
      });
    }
    const product = await ProductModel.findByIdAndRemove(id);
    res.status(200).json({
      data: product,
      status: 200,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Provide valid id",
      status: 400,
    });
  }
};
exports.updateProduct = async (req, res) => {
  let { title, description, price, rating, stock, brand, category, thumbnail } =
    req.body;
  try {
    let { id } = req.params;
    if (!id) {
      return res.status(404).json({
        data: undefined,
        message: "please provide product id",
      });
    }

    let updateProductData = await ProductModel.findByIdAndUpdate(id, {
      title,
      description,
      price,
      rating,
      stock,
      brand,
      category,
      thumbnail,
    });

    if (!updateProductData) {
      return res.status(400).json({
        status: 400,
        message: "Product update failed",
      });
    }
    return res.status(200).json({
      data: updateProductData,
      status: 200,
      message: "Product update successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
