import Head from "next/head";
import { useQuery } from "urql";
import { GET_PRODUCTS, GET_CATEGORIES } from "graphql/query";
import React, { useState } from "react";
import Product from "components/Product";
import styled from "styled-components";
import Link from "next/link";

const index = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [results, reexecuteQuery] = useQuery({
    query: GET_PRODUCTS,
    variables: selectedCategory
      ? {
          filters: {
            category: {
              slug: { eq: selectedCategory },
            },
          },
        }
      : null,
  });
  const { data, fetching, error } = results;

  const [categoryResults] = useQuery({
    query: GET_CATEGORIES,
    variables: {},
  });
  const {
    data: categoryData,
    fetching: categoryFetching,
    error: categoryError,
  } = categoryResults;
  if (fetching || categoryFetching) return <p>Loading...</p>;
  if (error || categoryError) return <p>Ugh.. {error.message}</p>;
  const products = data.products.data;
  const categories = categoryData.categories.data;
  console.log(categories);

  function handleCategroySelect(category) {
    setSelectedCategory(category);
    reexecuteQuery({ requestPolicy: "network-only" });
  }
  return (
    <main className=" flex">
      <Head>
        <title>All Products by Category</title>
      </Head>
      <aside className=" w-1/5">
        {categories?.map((item) => (
          <li
            onClick={() => handleCategroySelect(item.attributes.slug)}
            key={item.id}
            className="text-purple-900"
          >
            {item.attributes.name}
          </li>
        ))}
      </aside>
      <div className=" w-4/5">
        <section>
          <h1 className=" text-center font-semibold mb-3">My Store</h1>
          <ProductGallery>
            {products.map((product) => (
              <Product key={product.attributes.slug} product={product} />
            ))}
          </ProductGallery>
          <div className=" flex justify-center">
            <Link className=" btn btn-primary btn-sm" href={"/products"}>
              see more
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default index;
const ProductGallery = styled.div`
  /* display: grid;
 
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-gap: 2rem; */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
`;
