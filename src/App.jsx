import React from 'react';
import { hot } from 'react-hot-loader/root';
import Overview from './Components/Overview/Overview.jsx';
import Reviews from './Components/Reviews/Reviews.jsx';
import RelatedProducts from './Components/RelatedProducts/RelatedProducts.jsx';
import QA from './Components/QA/QA.jsx';
import PropTypes from 'prop-types';
import {
  Flexbox,
  StyledPageTitle,
  AppWrapper,
} from './Components/StyledComponents.jsx';
// import { products } from './data.jsx';

const App = (props) => {
  const name = props.name;
  // console.log(products);
  return (
    <AppWrapper>
      <StyledPageTitle>Hello {name}</StyledPageTitle>
      <Flexbox>
        <Overview />
      </Flexbox>
      <Flexbox>
        <RelatedProducts />
      </Flexbox>
      <Flexbox>
        <QA />
      </Flexbox>
      <Flexbox id='ratings_and_reviews'>
        <Reviews />
      </Flexbox>
    </AppWrapper>
  );
};
App.propTypes = {
  name: PropTypes.node,
};
export default hot(App);
