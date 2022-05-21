import React from 'react';
import { hot } from 'react-hot-loader/root';
import Overview from './Components/Overview/Overview.jsx';
import Reviews from './Components/Reviews/Reviews.jsx';
import RelatedProducts from './Components/RelatedProducts/RelatedProducts.jsx';
import Q_A from './Components/QA/QA.jsx';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Flexbox, StyledPageTitle, AppWrapper } from './StyledComponents.jsx';

const Flexbox = styled.div`
  display: flex;
  justify-content: center;
  max-width: 90%;
  margin: auto;
`;
const StyledPageTitle = styled.h1`
  display: flex;
  justify-content: center;
  background: black;
  color: gold;
`;
const AppWrapper = styled.div``;

const App = (props) => {
  const name = props.name;
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
        <Reviews />
      </Flexbox>
      <Flexbox>
        <Q_A />
      </Flexbox>
    </AppWrapper>
  );
};
App.propTypes = {
  name: PropTypes.node,
};
export default hot(App);
