const Review = require("../models/Review");
const router = require("express").Router();
const rateLimit = require("express-rate-limit");


const createReviewLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
});


//CREATE
router.post("/",createReviewLimiter,async (req, res) => {
    const newReview = new Review(req.body);
    try {
        const savedProduct = await newReview.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL REVIEWS
router.get("/product/:id", async (req, res) => {
    try {
        let reviews;
        reviews = await Review.find( { productId: req.params.id}).select("-email");
        res.status(200).json({
            reviews: reviews.sort((a, b) => b.createdAt - a.createdAt),
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/avg-rate", async (req, res) => {
    try {

        let result = await Review.aggregate([{$group: {_id: null, avgRating: {$avg: "$rating"}}}])
        res.status(200).json({
            avgRating: result.length>0?result[0].avgRating:0,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE REVIEW (only helpful filed)
router.put("/helpful/:id",async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            {$set: {helpful: req.body.helpful}},
            {upsert: true, new: true}
        )
        res.status(200).json(updatedReview);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;