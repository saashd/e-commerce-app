import React from "react";
import Topbar from "./Toolbar";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Conteiner = styled.div`
  position: relative;
  padding: 0 30px 28px 27px;
`


function Wrapper(props) {
    return (<>
        <Topbar/>
        <div>
            <Sidebar/>
            <Conteiner>
                {props.children}
            </Conteiner>
        </div>
    </>);
}


export default Wrapper;