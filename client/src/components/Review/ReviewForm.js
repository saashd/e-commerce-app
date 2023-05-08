import {Rating, TextField} from "@mui/material";
import {useState} from "react";
import isEmail from 'validator/lib/isEmail';
import axios from "axios";
import Card from '@mui/material/Card';
import styled from "styled-components";
import {device} from "../../responsive";
import HelpfulReview from "./HelpfulReview";

const Button = styled.button`
  margin: 50px;
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  @media only screen and ${device.mobile} {
    padding: 10px;
    font-size: 8px;
    border: 1px solid teal;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    background-color: #f8f4f4;
  }
`;
const ReviewForm = ({readOnly, reviewObj, productId, updateReviews}) => {
    const [review, setReview] = useState(reviewObj);
    const submitForm = async (e) => {
        e.preventDefault()
        if (isEmail(review.email)) {
            review.productId = productId
            try {
                const res = await axios.post(`/review`, review);

                if (res.status === 200) {
                    updateReviews(res.data)
                    setReview({})
                    alert("Thanks you for the review")
                } else {
                    alert("Something went wrong, please try again later.")
                }
            } catch (error) {
                alert("Something went wrong, please try again later.\n" + error.message)
            }
        } else {
            alert("Not a valid email")
        }
    }


    return (
        <Card style={{
            margin: "5%",
            padding: "1%",
            alignContent: "center",
            backgroundColor: readOnly ? "#01808017" : "white"
        }}>
            <form onSubmit={submitForm} style={{display: "grid", margin: "5%"}}>
                <Rating
                    readOnly={readOnly}
                    value={review.rating ?? 0}
                    onChange={(event, newValue) => {
                        setReview({...review, rating: newValue})
                    }}
                />
                <div style={{display: "grid"}}>
                    <TextField required label="Name" variant="standard" value={review.name ?? ""}
                               InputProps={{
                                   readOnly: readOnly,
                                   disableUnderline: readOnly
                               }}
                               onChange={(event) => {
                                   setReview({...review, name: event.target.value})
                               }}/>
                    <TextField required label="Email" variant="standard" value={review.email ?? ""}
                               InputProps={{
                                   readOnly: readOnly,
                                   disableUnderline: readOnly
                               }}
                               onChange={(event) => {
                                   setReview({...review, email: event.target.value})
                               }}/>
                    <TextField
                        InputProps={{
                            readOnly: readOnly,
                            disableUnderline: readOnly
                        }}

                        required
                        label="Review Description"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                        variant="standard"
                        value={review.description ?? ""}

                        onChange={(event) => {
                            setReview({...review, description: event.target.value})
                        }}
                    /></div>
                {!readOnly && <Button disabled={readOnly} type={"submit"}> Submit</Button>}


            </form>

            {readOnly && <HelpfulReview review={review} setReview={setReview}/>}
            {review.createdAt &&
                <span style={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}>{new Date(review.createdAt).toDateString()}</span>}
        </Card>
    );
}

export default ReviewForm