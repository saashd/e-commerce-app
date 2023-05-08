import ReviewForm from "./ReviewForm";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Dialog, DialogTitle, Grid, Rating, Typography} from "@mui/material";
import NotificationDisplay from "../NotificationDisplay";
import styled from "styled-components";
import {device} from "../../responsive";

const Button = styled.button`
  padding: 12px 15px;
  border-radius: 4px;
  border: 1px solid #018080;
  background-color: #018080;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;

  &:hover:not(:disabled) {
    background-color: #fff;
    color: #018080;
  }

  @media only screen and ${device.mobile} {
    padding: 10px 15px;
    font-size: 14px;
  }
`;

const Wrapper = styled.div`
  padding: 1%
`;
const AvgRatingWrapper = styled.div`
  display: flex;
  alignItems: center;
  padding: 15px 0 15px 0
`;

const Label = styled(Typography)`
  color: #6b6b6b;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
const Reviews = ({productId}) => {
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(null);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => {
        setOpenDialog(prevState => !prevState)
    }


    useEffect(() => {
        const getReviews = async () => {
            try {
                const res = await axios.get(`/review/product/${productId}`);
                setReviews((reviews) => [...reviews, ...res.data.reviews]);
            } catch (err) {
            }
        };
        getReviews();
    }, []);


    useEffect(() => {

        const getAvgRating = async () => {
            try {
                const res = await axios.get(`/review/avg-rate`);

                if (res.status === 200) {
                    setAvgRating(res.data.avgRating)
                }

            } catch (error) {
                setMessage("Couldn't display the reviews, please try again later.\n" + error.message);
                setMessageType("error");

            }
        };
        getAvgRating();
    }, [])

    const updateReviews = (review) => {
        setReviews([review, ...reviews])
    }
    return (
        <Wrapper>
            <Dialog onClose={handleDialogOpen} open={openDialog}>
                <DialogTitle><Label variant={"h6"}>Tell us more about this product</Label></DialogTitle>
                <ReviewForm productId={productId} updateReviews={updateReviews}/>
            </Dialog>
            <Button onClick={handleDialogOpen}> Review this product</Button>
            <AvgRatingWrapper>
                <Label variant={"h6"}>Product rating based on reviews:</Label>

                <Rating
                    precision={0.5}
                    readOnly
                    value={avgRating ?? 0}
                /></AvgRatingWrapper>
            {message && messageType && (
                <NotificationDisplay message={message} messageType={messageType}/>
            )}
            <Grid container justifyContent="center"
                  alignItems="center"
                  spacing={6}>
                {reviews.map((review) =>
                    <Grid item xs={12} md={4} key={review._id}>
                        <ReviewForm readOnly reviewObj={review} productId={productId}/>
                    </Grid>
                )}</Grid>

        </Wrapper>
    );
}

export default Reviews