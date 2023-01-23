import VisibilityIcon from '@mui/icons-material/Visibility';
import {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";

const Conteiner = styled.div`
  flex: 1;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
  margin-right: 20px;
`

const WidgetSmTitle = styled.h3`
 font-size: 22px;
  font-weight: 600;
`

const WidgetSmList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const WidgetSmListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px;
`

const WidgetSmUser = styled.div`
  display: flex;
  flex-direction: column;
`
const WidgetSmUsername = styled.span`
  font-weight: 600;
`


const WidgetSmButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  padding: 7px 10px;
  background-color: #eeeef7;
  color: #555;
  cursor: pointer;
`

const WidgetSmIcon = styled.div`
  font-size: 16px !important;
  margin-right: 5px;
`

export default function WidgetSm() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get("users/?new=true");
                setUsers(res.data);
            } catch {
            }
        };
        getUsers();
    }, []);
    return (
        <Conteiner>
            <WidgetSmTitle>New Join Members</WidgetSmTitle>
            <WidgetSmList>
                {users.map((user) => (
                    <WidgetSmListItem key={user._id}>
                        <WidgetSmUser>
                            <WidgetSmUsername>{user.username}</WidgetSmUsername>
                        </WidgetSmUser>
                        <WidgetSmButton>
                            <WidgetSmIcon>
                                <VisibilityIcon/>
                            </WidgetSmIcon>
                            Display
                        </WidgetSmButton>
                    </WidgetSmListItem>
                ))}
            </WidgetSmList>
        </Conteiner>
    );
}