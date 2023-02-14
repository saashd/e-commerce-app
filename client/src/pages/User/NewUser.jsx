import {useState} from "react";
import {addUser, register} from "../../redux/apiCalls";
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

const AddUserForm = styled.form`
  display: contents;
`

const AddUserItem = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const AddUserItemLabel = styled.label`

  color: gray;
  font-weight: 600;
  margin-bottom: 10px;
`

const AddUserItemInput = styled.input`
  padding: 10px;
`

const AddUserItemSelect = styled.select`
  padding: 10px;
`

const AddUserButton = styled.button`
  padding: 7px 10px;
  margin: 0 10px 10px 10px;
  right: 0;
  position: absolute;

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
export default function NewUser(props) {
    const {handleOpenDialog} = props;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const {isFetching} = useSelector((state) => state.user);


    const handleClick = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                const user = {username: username, email: email, password: password};
                addUser(user, dispatch);
            } catch (e) {
            }
            handleOpenDialog()
        } else {
            window.alert('passwords dont match')
        }

    };


    return (
        <Container>
            <AddUserForm>
                <AddUserItem>
                    <AddUserItemLabel>Username</AddUserItemLabel>
                    <AddUserItemInput
                        name="username"
                        type="text"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </AddUserItem>
                <AddUserItem>
                    <AddUserItemLabel>Email</AddUserItemLabel>
                    <AddUserItemInput
                        name="email"
                        type="email"
                        placeholder="example@exampe.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </AddUserItem>
                <AddUserItem>
                    <AddUserItemLabel>Password</AddUserItemLabel>
                    <AddUserItemInput
                        name="pasword"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </AddUserItem>
                <AddUserItem>
                    <AddUserItemLabel>Confirm Password</AddUserItemLabel>
                    <AddUserItemInput
                        name="confirmpasword"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </AddUserItem>
                <AddUserItem>
                    <AddUserItemLabel>Is Admin</AddUserItemLabel>
                    <AddUserItemSelect name="isAdmin" onChange={(e) => setPassword(e.target.value)}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </AddUserItemSelect>
                </AddUserItem>
                <AddUserActions>
                    <AddUserButton type="submit" disabled={isFetching} onClick={(event) => handleClick(event)}>
                        Create
                    </AddUserButton>
                </AddUserActions>
            </AddUserForm>
        </Container>
    );
}