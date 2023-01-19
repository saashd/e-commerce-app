import {useSelector} from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {mobile} from "../responsive";
import {Link} from "react-router-dom";
import Product from "../components/Product";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({padding: "10px"})}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
          props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection: "column"})}
`;

const Info = styled.div`
  display: flex;
  flex: 1;
`;




const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;



const WishList = () => {
    const wishList = useSelector((state) => state.wishList);
    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <Title>YOUR WISH LIST</Title>
                <Top>
                    <Link to="/">
                        <TopButton>
                            CONTINUE SHOPPING
                        </TopButton>
                    </Link>
                </Top>
                <Bottom>
                    <Info>
                        {wishList.products.map((product) => (
                            <Product item={product} key={product.id}/>
                        ))}
                        <Hr/>
                    </Info>
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    );
};

export default WishList;
