import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import Products from "../../components/Products";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import {device} from "../../responsive";
import {useLocation} from "react-router-dom";
import {useState} from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  @media only screen and ${device.mobile} {
    width: 0px 20px;
    display: flex;
    flex-direction: column
  }
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
    @media only screen and ${device.mobile} {
    margin-right:0px
  }
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  @media only screen and ${device.mobile} {
    margin: 10px 0px
  }
`;
const Option = styled.option``;

const ProductsList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [sort, setSort] = useState("newest");
    const [filters, setFilters] = useState({});
    const handleFilters = (e) => {
        const value = e.target.value;
        if (value === "all") {
            setFilters({})
        } else {
            setFilters({
                ...filters,
                [e.target.name]: value,
            });
        }

    };

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Title>{cat}</Title>
            <FilterContainer>
                {cat !== "houseplants" &&
                    <Filter>
                        <FilterText>Filter Products:</FilterText>
                        <Select name="color" onChange={handleFilters}>
                            <Option disabled>Color</Option>
                            <Option>all</Option>
                            <Option>white</Option>
                            <Option>black</Option>
                            <Option>red</Option>
                            <Option>blue</Option>
                            <Option>yellow</Option>
                            <Option>green</Option>
                        </Select>
                    </Filter>
                }

                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort}/>
            <Newsletter/>
            <Footer/>
        </Container>
    );
};

export default ProductsList;
