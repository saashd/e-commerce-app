import {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import {device} from "../../responsive";

const Conteiner = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;

`


const WidgetLgTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
    @media only screen and ${device.mobile} {
    font-size: 15px;
  }
`


const WidgetLgTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-spacing: 20px;
`

const WidgetLgTh = styled.th`
  text-align: left;
    @media only screen and ${device.mobile} {
    font-size: 10px;
  }
`


const WidgetLgUser = styled.td`
  display: flex;
  align-items: center;
  font-weight: 600;
    @media only screen and ${device.mobile} {
    font-size: 10px;  
      text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`

const WidgetTd = styled.td`
  font-weight: 300;
  @media only screen and ${device.mobile} {
    font-size: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &.status{
    text-overflow: unset;
    overflow: unset;
    white-space: unset;
  }
`


const WidgetLgButton = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;
  color: ${props => props.type === "approved" ? "#3bb077" : props.type === "declined" ? "#d95087" : "#2a7ade"};
  background-color: ${props => props.type === "approved" ? "#e5faf2" : props.type === "declined" ? "#fff0f1" : "#ebf1fe"};
  @media only screen and ${device.mobile} {
    font-size: 10px;
  }
`

export default function WidgetLg() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get("orders");
                setOrders(res.data);
            } catch {
            }
        };
        getOrders();
    }, []);
    return (
        <Conteiner>
            <WidgetLgTitle>Latest transactions</WidgetLgTitle>
            <WidgetLgTable>
                 <tbody>
                <tr>
                    <WidgetLgTh>Customer</WidgetLgTh>
                    <WidgetLgTh>Date</WidgetLgTh>
                    <WidgetLgTh>Amount</WidgetLgTh>
                    <WidgetLgTh>Status</WidgetLgTh>
                </tr>
                {orders.map((order) => (
                    <tr key={order._id}>
                        <WidgetLgUser>
                            <span>{order.userId}</span>
                        </WidgetLgUser>
                        <WidgetTd>{order.createdAt}</WidgetTd>
                        <WidgetTd>${order.amount}</WidgetTd>
                        <WidgetTd className={"status"}>
                            <WidgetLgButton type={order.status}>{order.status}</WidgetLgButton>
                        </WidgetTd>
                    </tr>
                ))}
                 </tbody>
            </WidgetLgTable>
        </Conteiner>
    );
}