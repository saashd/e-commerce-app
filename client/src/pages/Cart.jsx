import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {mobile} from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {removeProduct, updateProduct} from "../redux/cartRedux";
import axios from "axios";
import {Dialog, DialogActions, DialogTitle} from "@mui/material";


const KEY = process.env.REACT_APP_STRIPE;

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

const TopTexts = styled.div`
  ${mobile({display: "none"})}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection: "column"})}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection: "column"})}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductColor = styled.span`
  display: flex;
`;

const Color = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  box-shadow: ${(props) => `0px 0px 0px 3px ${props.color},0px 0px 0px 4px black`};
  margin: 0px 10px;
`;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({margin: "5px 15px"})}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({marginBottom: "20px"})}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDialog = (product = null) => {
        setOpen(!open);
        setSelectedProduct(product)
    };
    const handleQuantity = (product, type) => {
        if (type === "dec") {
            product.quantity > 1 ? dispatch(
                    updateProduct({...product, quantity: product.quantity - 1})
                ) :
                dispatch(removeProduct({...product}));
            setOpen(false);
            setSelectedProduct(null);
        } else {
            dispatch(
                updateProduct({...product, quantity: product.quantity + 1}))
        }
    };
    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                });
                navigate("/success", {
                    state: {
                        stripeData: res.data,
                        cart: cart,
                    }
                });
            } catch {
            }
        };
        stripeToken && makeRequest();
    }, [stripeToken, cart, navigate]);
    return (<>
            <Container>
                <Navbar/>
                <Announcement/>
                <Wrapper>
                    <Title>YOUR BAG</Title>
                    <Top>

                        <Link to="/">
                            <TopButton>
                                CONTINUE SHOPPING
                            </TopButton>
                        </Link>
                    </Top>
                    <Bottom>
                        <Info>
                            {cart.products.map((product) => (
                                <Product key={product._id}>
                                    <ProductDetail>
                                        <Image src={product.img}/>
                                        <Details>
                                            <ProductName>
                                                <b>Product:</b> {product.title}
                                            </ProductName>
                                            {product.color &&
                                                <ProductColor>
                                                    <b>Color:</b>
                                                    <Color color={product.color}>
                                                    </Color>
                                                </ProductColor>
                                            }
                                            <ProductId>
                                                <b>ID:</b> {product._id}
                                            </ProductId>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        <ProductAmountContainer>
                                            <AddIcon style={{cursor: "pointer"}}
                                                     onClick={() => handleQuantity(product, "inc")}/>
                                            <ProductAmount>{product.quantity}</ProductAmount>
                                            <RemoveIcon style={{cursor: "pointer"}}
                                                        onClick={() => handleDialog(product)}/>
                                        </ProductAmountContainer>
                                        <ProductPrice>
                                            $ {product.price * product.quantity}
                                        </ProductPrice>
                                    </PriceDetail>
                                </Product>
                            ))}
                            <Hr/>
                        </Info>
                        <Summary>
                            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Subtotal</SummaryItemText>
                                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Estimated Shipping</SummaryItemText>
                                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Shipping Discount</SummaryItemText>
                                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                            </SummaryItem>
                            <StripeCheckout
                                name="Urban Shop"
                                image="https://avatars.githubusercontent.com/u/52024657?s=400&u=3896d65197eefe2e141ee50c115c8ae1b3d61a2e&v=4"
                                billingAddress
                                shippingAddress
                                description={`Your total is $${cart.total}`}
                                amount={cart.total * 100}
                                token={onToken}
                                stripeKey={KEY}
                            >
                                <Button>CHECKOUT NOW</Button>
                            </StripeCheckout>
                        </Summary>
                    </Bottom>
                </Wrapper>
                <Footer/>
            </Container>
            <Dialog open={open}
                    onClose={handleDialog}>
                <DialogTitle>
                    Are you sure you want to remove this item?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDialog}>NO</Button>
                    <Button onClick={() => handleQuantity(selectedProduct, "dec")}>
                        YES
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Cart;
