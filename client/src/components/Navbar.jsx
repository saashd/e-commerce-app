import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import React from "react";
import styled from "styled-components";
import {device} from "../responsive";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/userRedux";
import {Tooltip} from "@mui/material";


const Container = styled.div`
    @media only screen and ${device.mobile} {
    height: 60px;
  }
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  margin-right: 5vw;
  cursor: pointer;
  @media only screen and ${device.mobile} {
    display: none;
  }

`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  padding: 2px;
`;

const Input = styled.input`
  border: none;
  @media only screen and ${device.mobile} {
    width: 15vw;
  }
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  @media only screen and ${device.mobile} {
    font-size: 20px;
  }
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media only screen and ${device.mobile} {
    flex: 2;
    justify-content: center;
  }
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  @media only screen and ${device.mobile} {
    font-size: 10px;
    margin-left: 10px;
  }
`;

const Link = styled.a`
  text-decoration: none !important;
  color: black;
`
const Navbar = () => {
    const user = useSelector((state) => state.user.currentUser);
    const cart_quantity = useSelector((state) => state.cart.quantity);
    const wish_quantity = useSelector((state) => state.wishList.quantity);
    const dispatch = useDispatch();
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search"/>
                        <SearchIcon style={{color: "gray", fontSize: 16}}/>
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>Urban.</Logo>
                </Center>
                <Right>{user ?
                    <LogoutOutlinedIcon
                        style={{cursor: "pointer"}} onClick={() => dispatch(logout())}/>
                    :
                    <>
                        <Link href="/register">
                            <MenuItem>REGISTER</MenuItem>
                        </Link>
                        <Link href="/login">
                            <MenuItem>SIGN IN</MenuItem>
                        </Link>
                    </>}
                    <Link href="/cart">
                        <MenuItem>
                            <Tooltip title="Cart">
                                <Badge badgeContent={cart_quantity} color="primary">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                            </Tooltip>

                        </MenuItem>
                    </Link>
                    <Link href="/wishlist">
                        <MenuItem>
                            <Tooltip title="Wish List">
                            <Badge badgeContent={wish_quantity} color="primary">
                                <FavoriteOutlinedIcon/>
                            </Badge>
                                </Tooltip>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
