import React from 'react';
import { hot } from 'react-hot-loader/root';
import ImageView from './ImageView.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ProductInfo from './ProductInfo.jsx';

function Overview() {
  return (
    <div>
      <h2>OVERVIEW</h2>
      <ImageView />
      <StyleSelector />
      <AddToCart />
      <ProductInfo />
    </div>
  );
}

export default hot(Overview);
