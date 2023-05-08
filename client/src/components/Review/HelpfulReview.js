import axios from "axios";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {IconButton} from "@mui/material";
import {useState} from "react";
import NotificationDisplay from "../NotificationDisplay";


const HelpfulReview = ({review, setReview}) => {
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);
    const handleHelpfulReview = async () => {
        try {
            const updatedReview = {...review};
            updatedReview.helpful = updatedReview.helpful ? updatedReview.helpful + 1 : 1;

            const res = await axios.put(`/review/helpful/${review._id}`, {helpful: updatedReview.helpful});
            if (res.status === 200) {
                setReview(updatedReview)
            } else {
                setMessage("Something went wrong, please try again later.");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("Something went wrong, please try again later.\n" + error.message+"\n" + error.response.data);
             setMessageType("error");
        }
    }

    return (
        <div>
              <div style={{display: "flex", justifyContent: review.helpful?"space-between":"flex-end"}}>
        {review.helpful && <span >{review.helpful} user{review.helpful>1&& "s"} found this review  helpful</span>}
        <IconButton onClick={handleHelpfulReview}> <ThumbUpIcon/></IconButton>

    </div>
            {message && messageType && (
                <NotificationDisplay message={message} messageType={messageType}/>
            )}
        </div>
      )

}

export default HelpfulReview;