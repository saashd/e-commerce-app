import React from "react";
import Topbar from "./Toolbar";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Conteiner = styled.div`
  flex: 4;
  top: 50px;
  position: relative;
  width: calc(100vw - 250px);`

function Wrapper(props) {
    return (<>
        <Topbar/>
        <div style={{display: "flex"}}>
            <Sidebar/>
            <Conteiner>
                {props.children}
            </Conteiner>
        </div>
    </>);
}


export default Wrapper;