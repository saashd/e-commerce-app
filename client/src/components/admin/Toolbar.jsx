import React from "react";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import styled from "styled-components";


const Conteiner = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 999;
`

const TopbarWrapper = styled.div`
  height: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.span`
  font-weight: bold;
  font-size: 30px;
  color: #009688;
  cursor: pointer;
`

const TopRight = styled.div`
  display: flex;
  align-items: center;
`
const TopLeft = styled.div`
  display: flex;
  align-items: center;
`

const TopbarIconContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  color: #555;
`

const TopIconBadge = styled.span`
  width: 15px;
  height: 15px;
  position: absolute;
  top: -5px;
  right: 0px;
  background-color: red;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`
const Topbar = () => {
    return (
        <Conteiner>
            <TopbarWrapper>
                <TopLeft>
                    <Logo>plants.admin</Logo>
                </TopLeft>
                <TopRight>
                    <TopbarIconContainer>
                        <NotificationsNoneIcon/>
                        <TopIconBadge>2</TopIconBadge>
                    </TopbarIconContainer>
                    <TopbarIconContainer>
                        <LanguageIcon/>
                        <TopIconBadge>2</TopIconBadge>
                    </TopbarIconContainer>
                    <TopbarIconContainer>
                        <SettingsIcon/>
                    </TopbarIconContainer>
                </TopRight>
            </TopbarWrapper>
        </Conteiner>
    );
}
export default Topbar;