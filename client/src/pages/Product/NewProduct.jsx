import {useState} from "react";
import {addProduct} from "../../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {Alert, Box, Button, Collapse} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const Container = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center;

`

const AddProductForm = styled.form`
  display: contents;
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

const AddProductButton = styled.button`
  padding: 7px 10px;
  margin: 0 10px 10px 10px;
  right: 0;
  position: absolute;

  &:disabled {
    color: gray;
    cursor: not-allowed;
  }
`
const AddProductActions = styled.div`
  display: flex;
  margin: 10px;
  align-items: flex-end;
  flex-direction: column;
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
        };


    return (
        <Container>
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
                        placeholder="Monstera Alba"
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
                    <AddProductItemInput type="text" placeholder="plants,accessories" onChange={handleCat}/>
                </AddProductItem>
                <AddProductItem>
                    <AddProductItemLabel>Stock</AddProductItemLabel>
                    <AddProductItemSelect name="inStock" onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </AddProductItemSelect>
                </AddProductItem>
                <AddProductActions>
                     <AddProductButton disabled={isFetching} onClick={handleClick}>
                        Create
                    </AddProductButton>
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
                            >{status === "success" ? 'New product created!' : "Error occured while creating new product"}</Alert>
                        </Collapse>
                    </Box>
                    }
                </AddProductActions>
            </AddProductForm>
        </Container>
    );
}