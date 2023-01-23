import LineStyleIcon from '@mui/icons-material/LineStyle';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ReportIcon from '@mui/icons-material/Report';

import {Link} from "react-router-dom";
import React from "react";
import {Drawer, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import styled from "styled-components";

export default function Sidebar() {
    return (
        <Drawer
            sx={{
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    flex: 1,
                    position: "sticky",
                    top: "50px",
                    width: "250px",
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <List
                component="nav">
                <ListSubheader component="div">
                    Dashboard
                </ListSubheader>
                <ListItemButton
                    component={Link}
                    to="/">
                    <ListItemIcon >
                        <LineStyleIcon/>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{fontSize: '13px'}}  primary="Home"/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <TimelineIcon/>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{fontSize: '13px'}} primary="Analytics"/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <TrendingUpIcon/>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{fontSize: '13px'}} primary="Sales"/>
                </ListItemButton>

                <ListSubheader component="div">
                    Quick Menu
                </ListSubheader>

                <ListItemButton
                    component={Link}
                    to="/users">
                    <ListItemIcon>
                        <PermIdentityIcon/>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{fontSize: '13px'}} primary="Users"/>
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/products">
                    <ListItemIcon>
                        <StorefrontIcon/>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{fontSize: '13px'}} primary="Products"/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <AttachMoneyIcon/>
                    </ListItemIcon>
                    <ListItemText  primaryTypographyProps={{fontSize: '13px'}} primary="Transactions"/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <BarChartIcon/>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{fontSize: '13px'}}  primary="Reports"/>
                </ListItemButton>

                <ListSubheader component="div" id="nested-list-subheader">
                    Nested List Items
                </ListSubheader>
                <ListItemButton>
                    <ListItemIcon>
                        <MailOutlineIcon/>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{fontSize: '13px'}} primary="Mail"/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <DynamicFeedIcon/>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{fontSize: '13px'}} primary="Feedback"/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <ChatBubbleOutlineOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{fontSize: '13px'}} primary="Messages"/>
                </ListItemButton>

                <ListSubheader component="div">
                    Staff
                </ListSubheader>
                <ListItemButton>
                    <ListItemIcon>
                        <WorkOutlineOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{fontSize: '13px'}} primary="Manage"/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <TimelineIcon/>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{fontSize: '13px'}} primary="Analytics"/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <ReportIcon/>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{fontSize: '13px'}} primary="Reports"/>
                </ListItemButton>
            </List>
        </Drawer>
    );
}