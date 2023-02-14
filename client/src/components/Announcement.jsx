import styled from "styled-components";
import {device} from "../responsive";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  @media only screen and ${device.mobile} {
    font-size: 12px;
    text-align: center;
  }
`;

const Announcement = () => {
  return <Container>Thank you so much for supporting small businesses. All the best for a wonderful 2023!</Container>;
};

export default Announcement;
