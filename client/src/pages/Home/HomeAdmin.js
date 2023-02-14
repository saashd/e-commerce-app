import FeaturedInfo from "../../components/admin/FeaturedInfo";
import WidgetSm from "../../components/admin/WidgetSm";
import WidgetLg from "../../components/admin/WidgetLg";
import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import Chart from "../../components/admin/Chart";
import styled from "styled-components";
import Wrapper from "../../components/admin/Wrapper";
import {device} from "../../responsive";


const HomeWidgets = styled.div`
  display: flex;
  margin: 20px;
  @media only screen and ${device.mobile} {
    flex-direction: column;
    align-items: stretch;
  }

`

const HomeAdmin = () => {
    const [userStats, setUserStats] = useState([]);
    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axios.get("/users/stats");
                res.data.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        {name: MONTHS[item._id - 1], "Active User": item.total},
                    ])
                );
            } catch {
            }
        };
        getStats();
    }, [MONTHS]);

    return (<Wrapper>
            <FeaturedInfo/>
            <Chart
                data={userStats}
                title="User Analytics"
                grid
                dataKey="Active User"
            />
            <HomeWidgets>
                <WidgetSm/>
                <WidgetLg/>
            </HomeWidgets>
        </Wrapper>
    );
}
export default HomeAdmin