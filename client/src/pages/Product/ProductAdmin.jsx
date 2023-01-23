import {Link, useLocation} from "react-router-dom";
import Chart from "../../components/admin/Chart";
import {useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import PublishIcon from '@mui/icons-material/Publish';
import styled from "styled-components";
import Wrapper from "../../components/admin/Wrapper";

const Container = styled.div`
  flex: 4;
  padding: 20px;
`
const ProductTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ProductAddButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`

const ProductTop = styled.div`
  display: flex;
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
`

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([]);

    const product = useSelector((state) =>
        state.product.products.products.find((product) => product._id === productId)
    );

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
    }, [productId, MONTHS]);

    return (
        <Wrapper>
            <Container>
                <ProductTitleContainer>
                    <h1>Product</h1>
                    <Link to="/newproduct">
                        <ProductAddButton>Create</ProductAddButton>
                    </Link>
                </ProductTitleContainer>
                <ProductTop>
                    <ProductTopLeft>
                        <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
                    </ProductTopLeft>
                    <ProductTopRight>
                        <ProductInfoTop>
                            <ProductInfoImg src={product.img} alt=""/>
                            <ProductName>{product.title}</ProductName>
                        </ProductInfoTop>
                        <ProductInfoBottom>
                            <ProductInfoItem>
                                <ProductInfoKey>id:</ProductInfoKey>
                                <ProductInfoValue>{product._id}</ProductInfoValue>
                            </ProductInfoItem>
                            <ProductInfoItem>
                                <ProductInfoKey>sales:</ProductInfoKey>
                                <ProductInfoValue>5123</ProductInfoValue>
                            </ProductInfoItem>
                            <ProductInfoItem>
                                <ProductInfoKey>in stock:</ProductInfoKey>
                                <ProductInfoValue>{product.inStock ? "yes" : "no"}</ProductInfoValue>
                            </ProductInfoItem>
                        </ProductInfoBottom>
                    </ProductTopRight>
                </ProductTop>
                <ProductBottom>
                    <ProductForm>
                        <ProductFormLeft>
                            <ProductFormLeftLabel>Product Name</ProductFormLeftLabel>
                            <ProductFormLeftInput type="text" placeholder={product.title}/>
                            <ProductFormLeftLabel>Product Description</ProductFormLeftLabel>
                            <ProductFormLeftInput type="text" placeholder={product.desc}/>
                            <ProductFormLeftLabel>Price</ProductFormLeftLabel>
                            <ProductFormLeftInput type="text" placeholder={product.price}/>
                            <ProductFormLeftLabel>In Stock</ProductFormLeftLabel>
                            <ProductFormLeftSelect name="inStock" id="idStock">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </ProductFormLeftSelect>
                        </ProductFormLeft>
                        <ProductFormRight>
                            <ProductUpload>
                                <ProductUploadImg src={product.img} alt=""/>
                                <label htmlFor="file">
                                    <PublishIcon/>
                                </label>
                                <input type="file" id="file" style={{display: "none"}}/>
                            </ProductUpload>
                            <ProductButton>Update</ProductButton>
                        </ProductFormRight>
                    </ProductForm>
                </ProductBottom>
            </Container>
        </Wrapper>
    );
}