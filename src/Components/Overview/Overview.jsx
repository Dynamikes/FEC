import React from 'react';
import { hot } from 'react-hot-loader/root';
import ImageView from './ImageView.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ProductInfo from './ProductInfo.jsx';
import styled from 'styled-components';

const FlexDisplay = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const StyledProductInfo = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: center;
`;
const ImageStack = styled.div`
  display: flex;
  justify-content: center;
`;
// const StyledImage = styled.div`
//   display: flex;
//   flex-grow: 3;
// `;

function Overview() {
  return (
    <div>
      <h2>OVERVIEW</h2>
      <ImageStack>
        <ImageView />
        <FlexDisplay>
          <StyleSelector />
          <AddToCart />
        </FlexDisplay>
      </ImageStack>

      <StyledProductInfo>
        <ProductInfo />
      </StyledProductInfo>
    </div>
  );
}

export default hot(Overview);
