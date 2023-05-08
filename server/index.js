const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const stripeRoute = require("./routes/stripe");
const orderRoute = require("./routes/order")
const reviewRoute = require("./routes/review")
const cors = require("cors");


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/orders", orderRoute);
app.use("/api/review",reviewRoute);

let port = process.env.PORT || 80;
app.listen(port, () => {
    console.log("Backend server is running, and listening to port " + port);
});
