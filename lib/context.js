import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [productQty, setProductQty] = useState(1);
  const [cardItems, setCardItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const increateQty = () => {
    setProductQty((prevState) => prevState + 1);
  };
  const decreaseQty = () => {
    setProductQty((prevState) => {
      if (prevState - 1 < 1) return 1;
      return prevState - 1;
    });
  };
  const handleOnAdd = (product, quantiy) => {
    const existedProduct = cardItems.find((item) => item.slug === product.slug);

    if (existedProduct) {
      setCardItems(
        cardItems.map((item) =>
          item.slug === product.slug
            ? { ...existedProduct, quantiy: existedProduct.quantiy + quantiy }
            : item
        )
      );
    } else {
      setCardItems([...cardItems, { ...product, quantiy: quantiy }]);
    }
  };
  const handleOnRemove = (product) => {
    const existedProduct = cardItems.find((item) => item.slug === product.slug);
    if (existedProduct.quantiy === 1) {
      setCardItems(cardItems.filter((item) => item.slug !== product.slug));
    } else {
      setCardItems(
        cardItems.map((item) =>
          item.slug === product.slug
            ? { ...existedProduct, quantiy: existedProduct.quantiy - quantiy }
            : item
        )
      );
    }
  };
  const contextValue = {
    productQty,
    cardItems,
    increateQty,
    decreaseQty,
    handleOnAdd,
    setShowCart,
    showCart,
    handleOnRemove,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
export const useStoreContext = () => useContext(StoreContext);
