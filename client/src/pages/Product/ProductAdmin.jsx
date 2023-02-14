import {Link, useLocation} from "react-router-dom";
import Chart from "../../components/admin/Chart";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import PublishIcon from '@mui/icons-material/Publish';
import styled from "styled-components";
import Wrapper from "../../components/admin/Wrapper";
import {addProduct, updateProduct} from "../../redux/apiCalls";
import {Alert, Box, Button, Collapse} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {device} from "../../responsive";

const Container = styled.div`
  flex: 4;
  padding: 20px;
`
const ProductTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ProductTop = styled.div`
  display: flex;
      @media only screen and ${device.mobile} {
      flex-direction: column;
  }
`

const ProductTopLeft = styled.div`
  flex: 1;
`
const ProductTopRight = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`

const ProductInfoImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #555;
  object-fit: cover;
  margin-right: 20px;
`

const ProductInfoTop = styled.div`
  display: flex;
  align-items: center;
`

const ProductName = styled.span`
  font-weight: 600;
`

const ProductInfoBottom = styled.div`
  margin-top: 10px;
`

const ProductInfoItem = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
`

const ProductInfoValue = styled.span`
  font-weight: 300;
  @media only screen and ${device.mobile} {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`
const ProductInfoKey = styled.span`
  font-weight: bold;
  padding-right: 20px
`
const ProductBottom = styled.div`
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`

const ProductForm = styled.form`
  display: flex;
  justify-content: space-between;
    @media only screen and ${device.mobile} {
      flex-direction: column;
  }
`

const ProductFormLeft = styled.div`
  display: flex;
  flex-direction: column;
`

const ProductFormLeftLabel = styled.label`
  margin-bottom: 10px;
  color: gray;
`

const ProductFormLeftInput = styled.input`
  margin-bottom: 10px;
  border: none;
  padding: 5px;
  border-bottom: 1px solid gray;
`
const ProductFormLeftSelect = styled.select`
  margin-bottom: 10px;

`

const ProductUploadImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
  border: 1px solid #555;
`

const ProductFormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ProductUpload = styled.div`
  display: flex;
  align-items: center;
`

const ProductButton = styled.button`
  border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    color: gray;
    cursor: not-allowed;
  }
`

export default function Product() {
    const location = useLocation();
    const dispatch = useDispatch();
    const productId = location.pathname.split("/")[2];
    const [file, setFile] = useState(null);
    const [pStats, setPStats] = useState([]);
    const [status, setStatus] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({})
    const product = useSelector((state) =>
        state.product.products.products.find((product) => product._id === productId)
    );
    const {isFetching} = useSelector((state) => state.product);


    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axios.get("orders/income?pid=" + productId);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        {name: MONTHS[item._id - 1], Sales: item.total},
                    ])
                );
            } catch {
            }
        };
        getStats();
        setUpdatedProduct(product)
        setFile(product.img)
    }, [productId, MONTHS, product]);
    const handleChange = (e) => {
        setUpdatedProduct((prev) => {
            return {...prev, [e.target.name]: e.target.value};
        });
    };
    const handleCat = (e) => {
        setUpdatedProduct((prev) => {
            return {...prev, [e.target.name]: e.target.value.split(",")};
        });
    };
    const handleClick = async (e) => {
        e.preventDefault();
        if (file !== updatedProduct.img) {
            let body = new FormData()
            body.append('image', file)
            const options = {
                method: 'POST',
                body: body,
            };
            try {
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`, options)
                const res = await response.json();
                const product = {...updatedProduct, img: res.data.display_url};
                updateProduct(product._id, product, dispatch);
                setUpdatedProduct(product)
                setStatus("success")
                setOpen(true);
            } catch (e) {
                setStatus('error');
                setOpen(true);
            }
        } else {
            try {
                const product = {...updatedProduct};
                updateProduct(product._id, product, dispatch);
                setStatus("success")
                setOpen(true);
            } catch (e) {
                setStatus('error');
                setOpen(true);
            }
        }
    }
    return (
        <Wrapper>
            <Container>
                <ProductTitleContainer>
                    <h1>Product</h1>
                </ProductTitleContainer>
                <ProductTop>
                    <ProductTopLeft>
                        <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
                    </ProductTopLeft>
                    <ProductTopRight>
                        <ProductInfoTop>
                            <ProductInfoImg src={updatedProduct.img} alt=""/>
                            <ProductName>{updatedProduct.title}</ProductName>
                        </ProductInfoTop>
                        <ProductInfoBottom>
                            <ProductInfoItem>
                                <ProductInfoKey>id:</ProductInfoKey>
                                <ProductInfoValue>{updatedProduct._id}</ProductInfoValue>
                            </ProductInfoItem>
                            <ProductInfoItem>
                                <ProductInfoKey>sales:</ProductInfoKey>
                                <ProductInfoValue>5123</ProductInfoValue>
                            </ProductInfoItem>
                            <ProductInfoItem>
                                <ProductInfoKey>in stock:</ProductInfoKey>
                                <ProductInfoValue>{updatedProduct.inStock===true || updatedProduct.inStock==="true"?"yes":"no"}</ProductInfoValue>
                            </ProductInfoItem>
                        </ProductInfoBottom>
                    </ProductTopRight>
                </ProductTop>
                <ProductBottom>
                    <ProductForm>
                        <ProductFormLeft>
                            <ProductFormLeftLabel>Product Name</ProductFormLeftLabel>
                            <ProductFormLeftInput type="text" name="title" value={updatedProduct.title}
                                                  onChange={handleChange}/>
                            <ProductFormLeftLabel>Product Description</ProductFormLeftLabel>
                            <ProductFormLeftInput type="text" name="desc" value={updatedProduct.desc}
                                                  onChange={handleChange}/>
                            <ProductFormLeftLabel>Price</ProductFormLeftLabel>
                            <ProductFormLeftInput type="number" name="price" value={updatedProduct.price}
                                                  onChange={handleChange}/>
                            <ProductFormLeftLabel>Categories</ProductFormLeftLabel>
                            <ProductFormLeftInput type="text" name="categories" value={updatedProduct.categories}
                                                  onChange={handleCat}/>
                            <ProductFormLeftLabel>In Stock</ProductFormLeftLabel>
                            <ProductFormLeftSelect value={updatedProduct.inStock} name="inStock" id="idStock"
                                                   onChange={handleChange}>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </ProductFormLeftSelect>
                        </ProductFormLeft>
                        <ProductFormRight>
                            <ProductUpload>
                                <ProductUploadImg src={updatedProduct.img} alt=""/>
                                <label htmlFor="file">
                                    <PublishIcon/>
                                </label>
                                <input type="file" id="file"
                                       onChange={(e) => setFile(e.target.files[0])}
                                       style={{display: "none"}}/>
                            </ProductUpload>
                            <ProductButton disabled={isFetching} onClick={handleClick}>Update</ProductButton>
                        </ProductFormRight>
                    </ProductForm>
                </ProductBottom>
                {status &&
                    <Box sx={{width: '100%'}}>
                        <Collapse in={open}>
                            <Alert severity={status}
                                   action={
                                       <Button onClick={() => {
                                           setOpen(false);
                                       }}
                                               color="inherit" size="small">
                                           <CloseIcon fontSize="inherit"/>
                                       </Button>
                                   }
                            >{status === "success" ? 'Product updated!' : "Error occured while updating"}</Alert>
                        </Collapse>
                    </Box>
                }
            </Container>
        </Wrapper>
    );
}