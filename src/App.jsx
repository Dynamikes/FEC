import React, { useState } from "react";
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
  HomeButtonDiv,
} from "./Components/StyledComponents.jsx";
export const prodIDContext = React.createContext();
export const starsContext = React.createContext();
export const productForAdd = React.createContext();
export const allProductsContext = React.createContext();
export const pageContext = React.createContext();
import { MAIN_API_KEY } from "./config.js";
import axios from "axios";

const App = ({ name }) => {
  const [prodID, setProdID] = useState(null);
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

  //const name = props.name;

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
  return prodID ? (
    <prodIDContext.Provider value={prodID}>
      <starsContext.Provider value={stars}>
        <productForAdd.Provider value={productName}>
          <AppWrapper>
            <HomeButton
              onClick={() => {
                updateID(null);
              }}
            >
              {" "}
              Home!{" "}
            </HomeButton>
            <StyledPageTitle>Hello {name}</StyledPageTitle>
            <Flexbox className="Overview">
              <Overview productAdd={productAdd} />
            </Flexbox>
            <Flexbox>
              <RelatedProducts />
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
