import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, getProducts} from "../../redux/apiCalls";
import {DataGrid} from '@mui/x-data-grid'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {Box, Dialog, DialogActions, DialogTitle, IconButton, LinearProgress, Button} from "@mui/material";
import Wrapper from "../../components/admin/Wrapper";
import styled from "styled-components";

const ProductLink = styled(Link)`
 margin: 0 0 10px 30px;
    display: -webkit-box;
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

const ProductList = () => {
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.product.products);
    const {isFetching} = useSelector((state) => state.product);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null)
    const handleDialog = (product = null) => {
        setOpen(!open);
        setSelectedProduct(product)
    };

    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteProduct(id, dispatch);
        setOpen(false);
        setSelectedProduct(null);
    };

    const columns = [
        {field: "_id", headerName: "ID", width: 220},
        {
            field: "title",
            headerName: "Product",
            width: 200,
        },
        {
            field: "product", headerName: "Img", width: 200,
            renderCell: (params) => {
                return (
                    <img className="productListImg" style={{width: "40%"}} src={params.row.img} alt=""/>
                );
            },
        },
        {field: "inStock", headerName: "Stock", width: 200},
        {
            field: "price",
            headerName: "Price",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/product/" + params.row._id}>
                            <IconButton><EditOutlinedIcon/></IconButton>
                        </Link>
                        <IconButton
                            onClick={() => handleDialog(params.row._id)}><DeleteOutlineOutlinedIcon/></IconButton>

                    </>
                );
            },
        },
    ];
    if (isFetching || !products) {
        return (<Wrapper><LinearProgress color="success"/></Wrapper>)
    }
    return (
        <Wrapper>
            <ProductLink to="/newproduct">
                <ProductAddButton>Create</ProductAddButton>
            </ProductLink>
            <Box sx={{
                height: "72vh", width: '95%', display: "flex",
                margin: "auto",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <DataGrid
                    rowHeight={80}
                    rows={products}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={5}
                    getRowId={(row) => row._id}
                    checkboxSelection
                />
            </Box>
            <Dialog open={open}
                    onClose={handleDialog}>
                <DialogTitle>
                    Are you sure you want to remove this item?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDialog}>NO</Button>
                    <Button onClick={() => handleDelete(selectedProduct)}>
                        YES
                    </Button>
                </DialogActions>
            </Dialog>
        </Wrapper>
    );
}


export default ProductList;