import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({cat, filters, sort}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [lastId, setLastId] = useState(0);
    const [tempId, setTempId] = useState(0);
    const [limit, setLimit] = useState(5);
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(cat ? `${process.env.REACT_APP_BASE_URL}api/products?category=${cat}&lastId=${lastId}&limit=${limit}` : `${process.env.REACT_APP_BASE_URL}api/products`);
                setProducts((products) => cat?[...products, ...res.data.products]:[...res.data.products]);
                setTempId(res.data.lastId);
                setHasMore(cat?res.data.hasMore:false);
            } catch (err) {
            }
        };
        getProducts();
    }, [cat,setHasMore,lastId]);

    useEffect(() => {
        cat &&
        setFilteredProducts(
            products.filter((item) => Object.entries(filters)
                .every(([key, value]) => item[key].includes(value))));
    }, [products, cat, filters]);


    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) => [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } else if (sort === "asc") {
            setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
        } else {
            setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
        }
    }, [sort]);

    const fetchMore = () => {
        setLastId(tempId);
    };

    return (
        <InfiniteScroll
            dataLength={cat ? filteredProducts.length : products.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
        ><Container>
            {cat
                ? filteredProducts.map((item) => <Product item={item} key={item.id}/>)
                : products.slice(0,8).map((item) => <Product item={item} key={item.id}/>)}
        </Container>
        </InfiniteScroll>);

};

export default Products;
