import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import Wrapper from "../../components/admin/Wrapper";
import {Alert, Box, Button, Collapse} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as PropTypes from "prop-types";
import {updateProduct, updateUser} from "../../redux/apiCalls";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const UserTitleContainer = styled.div`
  display: flex;
`


const UserForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const UserFormLeft = styled.div`
  display: flex;
  flex-direction: column;
`

const UserFormLeftLabel = styled.label`
  margin-bottom: 10px;
  color: gray;
`

const UserFormLeftInput = styled.input`
  margin-bottom: 10px;
  border: none;
  padding: 5px;
  border-bottom: 1px solid gray;
`
const UserFormLeftSelect = styled.select`
  margin-bottom: 10px;

`

const UserUploadImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
  border: 1px solid #555;
`

const UserFormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const UserUpload = styled.div`
  display: flex;
  align-items: center;
`

const AddUserButton = styled.button`
  border: none;
  padding: 5px;
  margin:5px;
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

const AddUserActions = styled.div`
  display: flex;
  margin: 10px;
  align-items: flex-end;
  flex-direction: column;
`
export default function User() {
    const location = useLocation();
    const userId = location.pathname.split("/")[2];
    const [status, setStatus] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({})
    const dispatch = useDispatch();

    const user = useSelector((state) =>
        state.user.users.find((user) => user._id === userId)
    );
    const {isFetching} = useSelector((state) => state.user);

    useEffect(() => {
        setUpdatedUser(user)
    }, [userId, user]);
    const handleChange = (e) => {
        setUpdatedUser((prev) => {
            return {...prev, [e.target.name]: e.target.value};
        });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            updateUser(user._id, updatedUser, dispatch);
            setStatus("success")
            setOpen(true);
        } catch (e) {
            setStatus('error');
            setOpen(true);
        }
    }
    return (
        <Wrapper>
            <Container>
                <UserTitleContainer>
                    <h1>User</h1>
                </UserTitleContainer>
                <UserForm>
                    <UserFormLeft>
                        <UserFormLeftLabel>User Name</UserFormLeftLabel>
                        <UserFormLeftInput type="text" name="username" value={updatedUser.username} onChange={handleChange}/>
                        <UserFormLeftLabel>Email</UserFormLeftLabel>
                        <UserFormLeftInput type="email" name="email" value={updatedUser.email} onChange={handleChange}/>
                        <UserFormLeftLabel>In Admin</UserFormLeftLabel>
                        <UserFormLeftSelect name="isAdmin" id="isAdmin" value={updatedUser.isAdmin} onChange={handleChange}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </UserFormLeftSelect>
                    </UserFormLeft>
                    <UserFormRight>
                        <AddUserActions>
                            <AddUserButton disabled={isFetching} onClick={handleClick}>
                                Create
                            </AddUserButton>
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
                                        >{status === "success" ? 'User updated!' : "Error occured while updating"}</Alert>
                                    </Collapse>
                                </Box>
                            }
                        </AddUserActions>
                    </UserFormRight>
                </UserForm>
            </Container>
        </Wrapper>
    );
}