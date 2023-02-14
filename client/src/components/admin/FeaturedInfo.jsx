import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import {device} from "../../responsive";

const Featured = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media only screen and ${device.mobile} {
    flex-direction: column;
    align-items: stretch;
    width: 80%;
  }
`

const FeaturedItem = styled.div`
  flex: 1;
  margin: 0px 20px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

  @media only screen and ${device.mobile} {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

`


const FeaturedTitle = styled.span`
  font-size: 20px;
  @media only screen and ${device.mobile} {
    font-size: 15px;
  }
`


const FeaturedMoneyContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`

const FeaturedMoney = styled.span`
  font-size: 30px;
  font-weight: 600;
  @media only screen and ${device.mobile} {
    font-size: 20px;
    font-weight: 500;
  }
`


const FeaturedMoneyRate = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
`

const FeaturedIcon = styled.div`
  font-size: 14px;
  margin-left: 5px;
  color: ${props => props.perc < 0 ? "red" : "green"};


`

const FeaturedSub = styled.span`
  font-size: 15px;
  color: gray;
  @media only screen and ${device.mobile} {
    font-size: 10px;
  }
`
export default function FeaturedInfo() {
    const [income, setIncome] = useState([]);
    const [perc, setPerc] = useState(0);

    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await axios.get("orders/income");
                setIncome(res.data);
                setPerc((res.data[1].total * 100) / res.data[0].total - 100);
            } catch {
            }
        };
        getIncome();
    }, []);

    return (
        <Featured>
            <FeaturedItem>
                <FeaturedTitle>Revanue</FeaturedTitle>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>${income[1]?.total}</FeaturedMoney>
                    <FeaturedMoneyRate>
                        %{Math.floor(perc)}{" "}
                        <FeaturedIcon perc={perc}>
                            {perc < 0 ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>}
                        </FeaturedIcon>
                    </FeaturedMoneyRate>
                </FeaturedMoneyContainer>
                <FeaturedSub>Compared to last month</FeaturedSub>
            </FeaturedItem>
            <FeaturedItem>
                <FeaturedTitle>Sales</FeaturedTitle>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>$4,415</FeaturedMoney>
                    <FeaturedMoneyRate>
                        -1.4
                        <FeaturedIcon perc={-1.4}>
                            <ArrowDownwardIcon/>
                        </FeaturedIcon>
                    </FeaturedMoneyRate>
                </FeaturedMoneyContainer>
                <FeaturedSub>Compared to last month</FeaturedSub>
            </FeaturedItem>
            <FeaturedItem>
                <FeaturedTitle>Costs</FeaturedTitle>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>$2,225</FeaturedMoney>
                    <FeaturedMoneyRate>
                        2.4
                        <FeaturedIcon perc={2.4}>
                            <ArrowUpwardIcon/>
                        </FeaturedIcon>
                    </FeaturedMoneyRate>
                </FeaturedMoneyContainer>
                <FeaturedSub>Compared to last month</FeaturedSub>
            </FeaturedItem>
        </Featured>
    );
}