import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, getUsers} from "../../redux/apiCalls";
import {DataGrid} from '@mui/x-data-grid'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
    Box,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    LinearProgress,
    Button,
    Collapse,
    Alert
} from "@mui/material";
import Wrapper from "../../components/admin/Wrapper";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import NewUser from "./NewUser";


const UserAddButton = styled.button`
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
const NewUserTitle = styled.h2`
  display: flex;
  justify-content: center;
`

const UsersList = () => {
    const dispatch = useDispatch();
    const {isFetching, users, error} = useSelector((state) => state.user);
    const [openDeleteUser, setOpenDeleteUser] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null)

    const handleOpenDialog = () => {
        setOpenDialog(!openDialog);

    }
    const handleDeleteUserDialog = (user = null) => {
        setOpenDeleteUser(!openDeleteUser);
        setSelectedUser(user)
    };

    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteUser(id, dispatch);
        setOpenDeleteUser(false);
        setSelectedUser(null);
    };

    const columns = [
        {field: "_id", headerName: "ID", width: 300},
        {
            field: "username",
            headerName: "User",
            width: 200,
        },

        {field: "email", headerName: "Email", width: 300},
        {
            field: "isAdmin",
            headerName: "Admin",
            width: 200,
        },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row._id}>
                            <IconButton><EditOutlinedIcon/></IconButton>
                        </Link>
                        <IconButton
                            onClick={() => handleDeleteUserDialog(params.row._id)}><DeleteOutlineOutlinedIcon/></IconButton>

                    </>
                );
            },
        },
    ];
    if (isFetching || !users) {
        return (<Wrapper><LinearProgress color="success"/></Wrapper>)
    }
    return (
        <Wrapper>
            <UserAddButton onClick={handleOpenDialog}>Create</UserAddButton>
            <Box sx={{
                height: "72vh", width: '95%', display: "flex",
                margin: "auto",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <DataGrid
                    rowHeight={80}
                    rows={users}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={5}
                    getRowId={(row) => row._id}
                    // checkboxSelection
                />
            </Box>
            <Dialog open={openDeleteUser}
                    onClose={handleDeleteUserDialog}>
                <DialogTitle>
                    Are you sure you want to remove this user?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDeleteUserDialog}>NO</Button>
                    <Button onClick={() => handleDelete(selectedUser)}>
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
                    <NewUserTitle>New User</NewUserTitle>
                </DialogTitle>
                <NewUser handleOpenDialog={handleOpenDialog}/>
            </Dialog>
        </Wrapper>
    );
}


export default UsersList;