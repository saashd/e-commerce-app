import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import {mobile} from "../responsive";
import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import {addProduct} from "../redux/cartRedux";
import {useDispatch} from "react-redux";
import axios from "axios";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({padding: "10px", flexDirection: "column"})}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({height: "40vh"})}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({padding: "10px"})}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0px;

`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 10px;
  cursor: pointer;
  box-shadow: ${(props) => props.color === props.selectedColor ? `0px 0px 0px 3px ${props.color},0px 0px 0px 4px black` : "0px 0px 0px 1px black"};

`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({width: "100%"})}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:disabled {
    cursor: not-allowed;

  }


  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get("/products/find/" + id);
                setProduct(res.data);

                res.data.color.length !== 0 && setColor(res.data.color[0]);
            } catch {
            }
        };
        getProduct();
    }, [id]);

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };


    const handleClick = () => {
        dispatch(addProduct({...product, quantity, color}))
    }

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img}/>
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>$ {product.price}</Price>
                    {(product.color && product.color.length !== 0) &&

                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color.map((c) => (
                                <FilterColor selectedColor={color} color={c} key={c} onClick={() => setColor(c)}/>
                            ))}
                        </Filter>

                    }
                    <AddContainer>
                        <AmountContainer>
                            <RemoveIcon onClick={() => handleQuantity("dec")}/>
                            <Amount>{quantity}</Amount>
                            <AddIcon onClick={() => handleQuantity("inc")}/>
                        </AmountContainer>
                        <Button onClick={handleClick} disabled={product.color && product.color.length !== 0 && !color}>ADD
                            TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter/>
            <Footer/>
        </Container>
    );
};

export default Product;
