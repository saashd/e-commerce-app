import {useState} from "react";
import {addProduct} from "../../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import Wrapper from "../../components/admin/Wrapper";
import {Alert, Box, Button, Collapse} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const Container = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center;

`

const AddProductForm = styled.form`
  margin-top: 10px;
`

const AddProductItem = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const AddProductItemLabel = styled.label`

  color: gray;
  font-weight: 600;
  margin-bottom: 10px;
`

const AddProductItemInput = styled.input`
  padding: 10px;
`

const AddProductItemSelect = styled.select`
  padding: 10px;
`

const AddProductButton = styled(Button)`
  margin-top: 10px;
  padding: 7px 10px;
`

export default function NewProduct() {
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);
    const dispatch = useDispatch();
    const {isFetching} = useSelector((state) => state.product);
    const [status, setStatus] = useState(undefined);
    const [open, setOpen] = useState(false);


    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name]: e.target.value};
        });
    };
    const handleCat = (e) => {
        setCat(e.target.value.split(","));
    };

    const handleClick = async (e) => {
            e.preventDefault();
            let body = new FormData()
            body.append('image', file)
            const options = {
                method: 'POST',
                body: body,
            };
            try {
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`, options)
                const res = await response.json();
                const product = {...inputs, img: res.data.display_url, categories: cat};
                addProduct(product, dispatch);
                setStatus("success")
                setOpen(true);
            } catch (e) {
                setStatus('error');
                setOpen(true);
            }


        }
    ;


    return (<Wrapper>
            <Container>
                <h2>New Product</h2>
                <AddProductForm>
                    <AddProductItem>
                        <AddProductItemLabel>Image</AddProductItemLabel>
                        <AddProductItemInput
                            type="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </AddProductItem>
                    <AddProductItem>
                        <AddProductItemLabel>Title</AddProductItemLabel>
                        <AddProductItemInput
                            name="title"
                            type="text"
                            placeholder="Apple Airpods"
                            onChange={handleChange}
                        />
                    </AddProductItem>
                    <AddProductItem>
                        <AddProductItemLabel>Description</AddProductItemLabel>
                        <AddProductItemInput
                            name="desc"
                            type="text"
                            placeholder="description..."
                            onChange={handleChange}
                        />
                    </AddProductItem>
                    <AddProductItem>
                        <AddProductItemLabel>Price</AddProductItemLabel>
                        <AddProductItemInput
                            name="price"
                            type="number"
                            placeholder="100"
                            onChange={handleChange}
                        />
                    </AddProductItem>
                    <AddProductItem>
                        <AddProductItemLabel>Categories</AddProductItemLabel>
                        <AddProductItemInput type="text" placeholder="jeans,skirts" onChange={handleCat}/>
                    </AddProductItem>
                    <AddProductItem>
                        <AddProductItemLabel>Stock</AddProductItemLabel>
                        <AddProductItemSelect name="inStock" onChange={handleChange}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </AddProductItemSelect>
                    </AddProductItem>
                    <AddProductButton disabled={isFetching} onClick={handleClick}>
                        Create
                    </AddProductButton>
                </AddProductForm>
                {status &&
                    <Box sx={{width: '30%'}}>
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
                            >{status === "success" ? 'New product created!' : "Error occured while creating new product"}</Alert>
                        </Collapse>
                    </Box>}
            </Container>
        </Wrapper>
    );
}