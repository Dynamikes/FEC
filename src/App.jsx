import React from 'react';
import { hot } from 'react-hot-loader/root';
import Overview from './Components/Overview/Overview.jsx';
import Reviews from './Components/Reviews/Reviews.jsx';
import RelatedProducts from './Components/RelatedProducts/RelatedProducts.jsx';
import Q_A from './Components/QA/QA.jsx';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Flexbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: auto;
`;

const App = (props) => {
  const name = props.name;
  return (
    <div>
<<<<<<< HEAD
      <h1>Hello There {name}</h1>
      <Overview />
      <Reviews />
      <RelatedProducts />
      <Q_A />
=======
      <h1>Hello {name}</h1>
      <Flexbox>
        <Overview />
      </Flexbox>
      <Flexbox>
        <RelatedProducts />
      </Flexbox>
      <Flexbox>
        <Reviews />
      </Flexbox>
      <Flexbox>
        <Q_A />
      </Flexbox>
>>>>>>> bbfc50f6171ed9bc2c8ad59814948c0abb2d20e7
    </div>
  );
};
App.propTypes = {
  name: PropTypes.node,
};
export default hot(App);
