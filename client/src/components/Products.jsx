import {useEffect, useState} from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({cat, sort}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    cat
                        ? `http://localhost:5000/api/products?category=${cat}`
                        : "http://localhost:5000/api/products"
                );
                setProducts(res.data);
            } catch (err) {
            }
        };
        getProducts();

    }, [cat]);

    useEffect(() => {

        if (sort === "newest") {
            setProducts((prev) =>
                [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            );
        } else if (sort === "asc") {
            setProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);

    return (
        <Container>
            {
                products.slice(0, 8).map((item) => <Product item={item} key={item._id}/>)
            }
        </Container>
    );
};

export default Products;
