import {Rating, TextField} from "@mui/material";
import React, {useState} from "react";
import isEmail from 'validator/lib/isEmail';
import axios from "axios";
import Card from '@mui/material/Card';
import styled from "styled-components";
import {device} from "../../responsive";
import HelpfulReview from "./HelpfulReview";
import NotificationDisplay from "../NotificationDisplay";

const Button = styled.button`
  padding: 12px 10px;
  border-radius: 4px;
  border: 1px solid #018080;
  background-color: #018080;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    background-color: #fff;
    color: #018080;
  }

  @media only screen and ${device.mobile} {
    padding: 10px 15px;
    font-size: 14px;
  }
`;

const CardContainer = styled(Card)`
  padding: ${({readOnly}) => readOnly ? "1% 5% 0 5%" : "0 10% 0 10%"};

  &:not(:last-child) {
    margin-bottom: 30px;
  }

`;

const Form = styled.form`
  display: grid;
  row-gap: 20px;
    margin:5%;

  @media only screen and ${device.mobile} {
    row-gap: 10px;
  }
`;

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
`;

const DateWrapper = styled.span`
  display: flex;
  justify-content: flex-start;
  font-size: 12px;
  color: #6b6b6b
  `;

const WhiteBorderTextField = styled(TextField)`
  .MuiInputLabel-root {
  color: grey !important;
}
  /* focused */
  .MuiInput-underline:after {
    border-bottom: 2px solid grey;
  }
  overflow: auto;
`;

const ReviewForm = ({
                        readOnly,
                        reviewObj = {rating: 0, name: "", email: "", description: ""},
                        productId,
                        updateReviews
                    }) => {
    const [review, setReview] = useState(reviewObj);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);

    const submitForm = async (e) => {
        e.preventDefault()
        if (isEmail(review.email)) {
            review.productId = productId
            try {
                const res = await axios.post(`/review`, review);

                if (res.status === 200) {
                    updateReviews(res.data)
                    setReview({rating: 0, name: "", email: "", description: ""})
                    setMessage("Thanks you for the review");
                    setMessageType("success");
                } else {
                    setMessage("Something went wrong, please try again later.");
                    setMessageType("error");
                }
            } catch (error) {
                setMessage("Something went wrong, please try again later.\n" + error.message);
                setMessageType("error");
            }
        } else {
            setMessage("Not a valid email");
            setMessageType("warning");
        }
    }


    return (

        <CardContainer readOnly={readOnly} style={{backgroundColor: readOnly ? "#01808017" : "white"}}>
            {message && messageType && (
                <NotificationDisplay message={message} messageType={messageType}/>
            )}
            {review.createdAt &&
                <DateWrapper>{new Date(review.createdAt).toDateString()}</DateWrapper>}
            <Form onSubmit={submitForm}>
                <Rating
                    readOnly={readOnly}
                    value={review.rating ?? 0}
                    onChange={(event, newValue) => {
                        setReview({...review, rating: newValue})
                    }}
                />
                <InputWrapper>
                    <WhiteBorderTextField required label={readOnly ? null : "Name"}  variant="standard" value={review.name ?? ""}
                               InputProps={{
                                   readOnly: readOnly,
                                   disableUnderline: readOnly,
                                   style: {
                                       fontSize:readOnly? 'x-large':"unset",
                                   },
                               }}
                               onChange={(event) => {
                                   setReview({...review, name: event.target.value})
                               }}/>
                    {!readOnly && <WhiteBorderTextField required label={readOnly ? null : "Email"}  variant="standard" value={review.email ?? ""}

                                             InputProps={{
                                                 readOnly: readOnly,
                                                 disableUnderline: readOnly
                                             }}
                                             onChange={(event) => {
                                                 setReview({...review, email: event.target.value})
                                             }}/>}
                    <WhiteBorderTextField
                        InputProps={{
                            readOnly: readOnly,
                            disableUnderline: readOnly
                        }}

                        required
                        label={readOnly ? null : "Description"}

                        multiline
                        rows={4}
                        variant="standard"
                        value={review.description ?? ""}

                        onChange={(event) => {
                            setReview({...review, description: event.target.value})
                        }}
                    /></InputWrapper>
                {!readOnly && <Button disabled={readOnly} type={"submit"}> Submit</Button>}


            </Form>

            {readOnly && <HelpfulReview review={review} setReview={setReview}/>}

        </CardContainer>
    );
}

export default ReviewForm