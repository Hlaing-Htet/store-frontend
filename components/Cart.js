import React from "react";
import { useStoreContext } from "../lib/context";
import { FaShoppingCart } from "react-icons/fa";
import styled from "styled-components";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
const Cart = () => {
  const {
    cardItems,
    decreaseQty,
    increateQty,
    productQty,
    handleOnAdd,
    handleOnRemove,
    setShowCart,
  } = useStoreContext();
  return (
    <CartWrapper onClick={() => setShowCart(false)}>
      <CartStyled>
        {cardItems.length < 1 ? (
          <EmptyStyled>
            <h1>Shop more and add products to cart </h1>
            <FaShoppingCart />
          </EmptyStyled>
        ) : null}
        {cardItems.length > 1
          ? cardItems.map((item) => (
              <div key={item.slug}>
                <img
                  src={item.image.data.attributes.formats.small.url}
                  alt={item.title}
                />
                <Quantity>
                  <span>Quantity</span>
                  <button onClick={() => handleOnRemove(item)}>
                    <AiFillMinusCircle />
                  </button>
                  <p>{productQty}</p>
                  <button onClick={increateQty}>
                    <AiFillPlusCircle />
                  </button>
                </Quantity>
              </div>
            ))
          : null}
      </CartStyled>
    </CartWrapper>
  );
};

export default Cart;

export const CartWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
`;

export const CartStyled = styled.div`
  width: 40%;
  background: #f1f1f1;
  padding: 2rem 5rem;
  overflow-y: scroll;
  position: relative;
`;
const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0rem;
  button {
    background: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
  }
  p {
    width: 1rem;
    text-align: center;
  }
  span {
    color: var(--secondary);
  }
  svg {
    color: #494949;
  }
`;
export const CartItemsStyle = styled.div``;

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
  padding: 2rem;
  margin: 2rem 0rem;
  img {
    width: 8rem;
  }
`;

export const CardInfo = styled.div`
  width: 50%;
  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const EmptyStyled = styled.div`
  /* For the empty cart */
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  /*  */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  svg {
    font-size: 10rem;
    color: var(--secondary);
  }
`;

export const Checkout = styled.div`
  button {
    background: var(--primary);
    padding: 1rem 2rem;
    width: 100%;
    color: white;
    margin-top: 2rem;
    cursor: pointer;
  }
`;