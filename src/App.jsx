import React from 'react';
import { hot } from 'react-hot-loader/root';
import Overview from './Components/Overview/Overview.jsx';
import Reviews from './Components/Reviews/Reviews.jsx';
import RelatedProducts from './Components/RelatedProducts/RelatedProducts.jsx';
import Q_A from './Components/QA/QA.jsx';
import PropTypes from 'prop-types';

const App = (props) => {
  const name = props.name;
  return (
    <div>
      <h1>Hello There {name}</h1>
      <Overview />
      <Reviews />
      <RelatedProducts />
      <Q_A />
    </div>
  );
};
App.propTypes = {
  name: PropTypes.node,
};
export default hot(App);
