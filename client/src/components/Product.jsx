import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, removeProduct} from "../redux/wishListRedux";
import {useState} from "react";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #${(props) => props.inStock ? "008080" : "f1f1f1"};

  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;


const Image = styled.img`
  height: 90%;
  z-index: 2;
`;

const Text = styled.h1`
  color: #ffffff;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  color: black;

  &:hover {
    background-color: #dce3e3;
    transform: scale(1.1);
  }
`;

const Product = ({item}) => {

    const wishList = useSelector((state) => state.wishList.products);
    const [inWishList,setInWishList]=useState(wishList.some(e => e._id === item._id))
    const dispatch = useDispatch();
    const handleClick = () => {
        if (!inWishList) {
            dispatch(addProduct({...item}))
            setInWishList(true)

        } else {
            dispatch(removeProduct({...item}))
            setInWishList(false)
        }
    }

    return (
        <Container inStock={item.inStock}>
            <Image src={item.img}/>
            <Info>{item.inStock ?
                <>
                    <Link to={`/product/${item._id}`}>
                        <Icon>
                            <SearchOutlinedIcon/>
                        </Icon>
                    </Link>

                    <Icon>
                        {inWishList ? <FavoriteIcon onClick={handleClick}/> :
                            <FavoriteBorderOutlinedIcon onClick={handleClick}/>}

                    </Icon>
                </> :
                <Text>
                    Item out of stock.
                </Text>
            }
            </Info>
        </Container>
    );
};

export default Product;
