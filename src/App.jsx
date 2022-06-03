import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import Overview from "./Components/Overview/Overview.jsx";
import Reviews from "./Components/Reviews/Reviews.jsx";
import RelatedProducts from "./Components/RelatedProducts/RelatedProducts.jsx";
import QA from "./Components/QA/QA.jsx";
import PropTypes from "prop-types";
import HomePage from "./HomePage.jsx";
import {
  Flexbox,
  StyledPageTitle,
  AppWrapper,
  HomeButton,
} from "./Components/StyledComponents.jsx";
export const prodIDContext = React.createContext();
export const starsContext = React.createContext();
export const productForAdd = React.createContext();
export const allProductsContext = React.createContext();
export const pageContext = React.createContext();

const App = ({ name }) => {
  const [prodID, setProdID] = useState(40352);
  const [stars, setStars] = useState(null);
  const [productName, setProductName] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(0);

  const changeStars = (count) => {
    setStars(count);
  };

  const productAdd = (prod) => {
    setProductName(prod);
  };

  const updateID = (id) => {
    setProdID(id);
    console.log(id);
  };
  const updateAllProducts = (array) => {
    setAllProducts(array);
  };
  const incrementPage = () => {
    setPage(page + 1);
  };
  // useEffect(() => {
  //   console.log("Rerender triggered! : ", prodID);
  // }, [prodID]);

  return prodID ? (
    <prodIDContext.Provider value={prodID}>
      <starsContext.Provider value={stars}>
        <productForAdd.Provider value={productName}>
          <AppWrapper>
            
            <StyledPageTitle
              onClick={() => {
                updateID(null);
              }}
            >
              Iron Man-a-zon
            </StyledPageTitle>
            <Flexbox className="Overview">
              <Overview productAdd={productAdd} />
            </Flexbox>
            <Flexbox>
              <RelatedProducts updateID={updateID} />
            </Flexbox>
            <Flexbox id="ratings_and_reviews">
              <Reviews changeStars={changeStars} />
            </Flexbox>
            <Flexbox>
              <QA />
            </Flexbox>
          </AppWrapper>
        </productForAdd.Provider>
      </starsContext.Provider>
    </prodIDContext.Provider>
  ) : (
    <allProductsContext.Provider value={allProducts}>
      <pageContext.Provider value={page}>
        <HomePage
          updateID={updateID}
          updateAllProducts={updateAllProducts}
          incrementPage={incrementPage}
        />
      </pageContext.Provider>
    </allProductsContext.Provider>
  );
};

export default hot(App);
