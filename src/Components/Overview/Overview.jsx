import React, { useState} from 'react';
import { hot } from 'react-hot-loader/root';
import ImageView from './ImageView.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ProductDescription from './ProductDescription.jsx';
import ProductInfo from './ProductInfo.jsx';
import {
  StyledSideBar,
  HiddenSideBar,
  StyledProductInfo,
  Wrapper,
  OverviewWrapper,
  StyledImageView
}
from '../StyledComponents.jsx'
export const styleIDContext = React.createContext();
function Overview() {
  //hook that adds state ttoggle
  //function that toggles state from A to B
  let [toggle, setToggle] = useState(!toggle);
  const [styleID, setStyleID] = useState(null)

  const toggleFunc = () => {
    setToggle(!toggle);
  };
  const changeStyleID = (id) => {
    setStyleID(id)
    console.log(id)
  }

  return (
    <styleIDContext.Provider value={styleID}>
    <OverviewWrapper>
      <Wrapper>
        <StyledImageView>
          <ImageView click={toggleFunc} />
        </StyledImageView>
        {toggle ? (
          <StyledSideBar>
            {' '}
            <ProductInfo />
            <StyleSelector click={changeStyleID} />
            <AddToCart />{' '}
          </StyledSideBar>
        ) : (
          <HiddenSideBar>
            {' '}
            <ProductInfo />
            <StyleSelector />
            <AddToCart />{' '}
          </HiddenSideBar>
        )}
      </Wrapper>
      <StyledProductInfo>
        <ProductDescription />
      </StyledProductInfo>
    </OverviewWrapper>
    </styleIDContext.Provider>
  );
}

export default hot(Overview);
