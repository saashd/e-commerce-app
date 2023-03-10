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
import CloseIcon from "@mui/icons-material/Close";
import NewProduct from "../Product/NewProduct";


const ProductAddButton = styled.button`
  border: none;
  padding: 8px;
  background-color: teal;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 10px 10px 30px;
  display: -webkit-box;
`
const NewProductTitle = styled.h2`
  display: flex;
  justify-content: center;
`

const ProductList = () => {
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.product.products);
    const {isFetching} = useSelector((state) => state.product);
    const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null)

    const handleOpenDialog = () => {
        setOpenDialog(!openDialog);

    }
    const handleDeleteProductDialog = (product = null) => {
        setOpenDeleteProduct(!openDeleteProduct);
        setSelectedProduct(product)
    };

    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteProduct(id, dispatch);
        setOpenDeleteProduct(false);
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
                            onClick={() => handleDeleteProductDialog(params.row._id)}><DeleteOutlineOutlinedIcon/></IconButton>

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
            <ProductAddButton onClick={handleOpenDialog}>Create</ProductAddButton>
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
                    // checkboxSelection
                />
            </Box>
            <Dialog open={openDeleteProduct}
                    onClose={handleDeleteProductDialog}>
                <DialogTitle>
                    Are you sure you want to remove this item?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDeleteProductDialog}>NO</Button>
                    <Button onClick={() => handleDelete(selectedProduct)}>
                        YES
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullWidth={true}
                maxWidth="sm"
                open={openDialog}
                onClose={handleOpenDialog}>
                <DialogTitle>
                    <IconButton onClick={handleOpenDialog}>
                        <CloseIcon/>
                    </IconButton>
                    <NewProductTitle>New Product</NewProductTitle>
                </DialogTitle>
                <NewProduct/>
            </Dialog>
        </Wrapper>
    );
}


export default ProductList;