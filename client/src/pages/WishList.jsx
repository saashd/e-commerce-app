import {useSelector} from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {device} from "../responsive";
import {Link} from "react-router-dom";
import Product from "../components/Product";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  @media only screen and ${device.mobile} {
    padding: 10px
  }
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
    @media only screen and ${device.mobile} {
    font-size: 20px;
  }
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
    @media only screen and ${device.mobile} {
    font-size: 10px;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and ${device.mobile} {
    flex-direction: column
  }
`;

const Info = styled.div`
  display: flex;
  flex: 1;
  @media only screen and ${device.mobile} {
    flex-direction: column;
  }
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
