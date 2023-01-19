import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RoomIcon from '@mui/icons-material/Room';
import TwitterIcon from '@mui/icons-material/Twitter';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import styled from "styled-components";
import {mobile} from "../responsive";
import {Link} from "react-router-dom";

const Container = styled.div`
  display: flex;
  ${mobile({flexDirection: "column"})}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({display: "none"})}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;

`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;


const LinkItem = styled(Link)`
  color: black;
  text-decoration: none;
`;


const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({backgroundColor: "#fff8f8"})}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;


const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>Urban.</Logo>
                <Desc>
                    There are many variations of passages of Lorem Ipsum available, but
                    the majority have suffered alteration in some form, by injected
                    humour, or randomised words which don’t look even slightly believable.
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <FacebookIcon/>
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <InstagramIcon/>
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <TwitterIcon/>
                    </SocialIcon>
                    <SocialIcon color="E60023">
                        <PinterestIcon/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>
                        <LinkItem to="/">
                            Home
                        </LinkItem>
                    </ListItem>
                    <ListItem>
                        <LinkItem to="/cart">Cart
                        </LinkItem>
                    </ListItem>
                    <ListItem>
                        <LinkItem to="/products/houseplants">
                            House Plants
                        </LinkItem>
                    </ListItem>
                    <ListItem>
                        <LinkItem to="/products/pots">
                            Pots
                        </LinkItem>
                    </ListItem>
                    <ListItem>
                        <LinkItem to="/products/accessories">
                            Accessories
                        </LinkItem>
                    </ListItem>

                    {/*<ListItem>My Account</ListItem>*/}
                    {/*<ListItem>Order Tracking</ListItem>*/}
                    <ListItem>
                        <LinkItem to="/wishlist">Wishlist
                        </LinkItem>
                    </ListItem>
                    {/*<ListItem>Terms</ListItem>*/}
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <RoomIcon style={{marginRight: "10px"}}/> 16, Tarad , Ramat Gan 5213603
                </ContactItem>
                <ContactItem>
                    <PhoneIcon style={{marginRight: "10px"}}/> +972 55 458 1232
                </ContactItem>
                <ContactItem>
                    <MailOutlinedIcon style={{marginRight: "10px"}}/> contact@urban.dev
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
            </Right>
        </Container>
    );
};

export default Footer;
