const Review = require("../models/Review");
const router = require("express").Router();
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
});

//CREATE
//TODO: check why post throws 500, check loginLimiter
router.post("/",async (req, res) => {
    const newReview = new Review(req.body);
    try {
        const savedProduct = await newReview.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL REVIEWS
//TODO: fetch data by plant id
router.get("/", async (req, res) => {
    //TODO: get 5 reviews each time, instead of fetching all the data
    const qLastId = req.query.lastId || 0;
    const qLimit = parseInt(req.query.limit) || 0;
    try {
        let reviews;
        //TODO: check why sort not working
        reviews = await Review.find().sort({createdAt: 1});
        res.status(200).json({
            reviews: reviews,
            // lastId: reviews.length ? reviews[reviews.length - 1]._id : 0,
            // hasMore: qLimit ? reviews.length >= qLimit : false
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/avg-rate", async (req, res) => {
    try {

        let result = await Review.aggregate([{$group: {_id: null, avgRating: {$avg: "$rating"}}}])

        res.status(200).json({
            avgRating: result[0].avgRating,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.put("/:id", async (req, res) => {
    console.log(req.body)
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            {$set: {helpful: req.body.helpful}},
            {upsert: true, new: true}
        )
        console.log(updatedReview)
        res.status(200).json(updatedReview);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;