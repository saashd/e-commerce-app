import ReviewForm from "./ReviewForm";
import {useEffect, useState} from "react";
import axios from "axios";
import {Grid, Rating, Typography} from "@mui/material";

const Reviews = ({productId}) => {
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(null);
    useEffect(() => {

        const getReviews = async () => {
            try {
                const res = await axios.get(`/review`);

                if (res.status === 200) {
                    setReviews(res.data.reviews)
                }

            } catch (error) {

                alert("Something went wrong, please try again later.\n" + error.message)
            }
        };
        getReviews();
    }, [])

    useEffect(() => {

        const getAvgRating = async () => {
            try {
                const res = await axios.get(`/review/avg-rate`);

                if (res.status === 200) {
                    setAvgRating(res.data.avgRating)
                }

            } catch (error) {

                alert("Something went wrong, please try again later.\n" + error.message)
            }
        };
        getAvgRating();
    }, [])

    const updateReviews = (review) => {
        setReviews([review, ...reviews])
    }
    return (
        <div>
            <Typography variant={"h6"}>Tell us more about this product</Typography>
            <div style={{marginLeft: "25%", marginRight: "25%"}}>
                <ReviewForm reviewObj={{}} productId={productId} updateReviews={updateReviews}/>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Typography variant={"h6"}>Product reviews</Typography>
                <Rating
                    precision={0.5}
                    readOnly
                    value={avgRating ?? 0}
                /></div>

            <Grid container>
                {reviews.map((review) =>
                    <Grid item xs={6} key={review._id}>
                        <ReviewForm readOnly reviewObj={review} productId={productId}/>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

export default Reviews