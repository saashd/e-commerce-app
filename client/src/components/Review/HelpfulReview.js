import axios from "axios";

import styled from "styled-components";
import {device} from "../../responsive";



const Button = styled.button`
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
const HelpfulReview = ({review, setReview}) => {
    const handleHelpfulReview = async () => {
        try {
            const updatedReview = {...review};
            updatedReview.helpful = updatedReview.helpful ? updatedReview.helpful + 1 : 1;

            const res = await axios.put(`/review/${review._id}`, {helpful: updatedReview.helpful});
            if (res.status === 200) {
                setReview(updatedReview)
            } else {
                alert("Something went wrong, please try again later.")
            }
        } catch (error) {

            alert("Something went wrong, please try again later.\n" + error.message + error.response.data)
        }
    }

    return <div style={{display: "flex", justifyContent: review.helpful?"space-between":"flex-end"}}>
        {review.helpful && <span >{review.helpful} user{review.helpful>1&& "s"} found this review  helpful</span>}
        <Button onClick={handleHelpfulReview}> Helpful</Button>
    </div>

}

export default HelpfulReview;