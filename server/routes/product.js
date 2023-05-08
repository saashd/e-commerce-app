const Product = require("../models/Product");
const {
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const qLastId = req.query.lastId || 0;
    const qLimit = parseInt(req.query.limit) || 0;
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({createdAt: -1}).limit(1);
        } else if (qCategory) {
            if (qLastId < 1) {
                products = await Product.find({
                    categories: {
                        $in: [qCategory],
                    },
                }).limit(qLimit)

            } else {
                products = await Product.find({
                    _id: {$gt: qLastId},
                    categories: {
                        $in: [qCategory],
                    },
                }).limit(qLimit)
            }
        } else {
            products = await Product.find().limit(qLimit)
        }
        res.status(200).json({
            products: products,
            lastId: products.length ? products[products.length - 1]._id : 0,
            hasMore: qLimit ? products.length >= qLimit : false
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;