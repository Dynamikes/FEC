import React, {useState} from 'react';
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
  ReviewTitle,
} from './Components/StyledComponents.jsx';
export const prodIDContext = React.createContext();
const App = (props) => {
  const [prodID, setProdID] = useState(40350)

  const name = props.name;
  return (
    <prodIDContext.Provider value={prodID} >
    <AppWrapper>
      <StyledPageTitle>Hello {name}</StyledPageTitle>
      <Flexbox>
        <Overview />
      </Flexbox>
      <Flexbox>
        <RelatedProducts />
      </Flexbox>
      <ReviewTitle>Ratings {'&'} Reviews</ReviewTitle>
      <Flexbox id="ratings_and_reviews">
        <Reviews />
      </Flexbox>
      <Flexbox>
        <QA />
      </Flexbox>
    </AppWrapper>
    </prodIDContext.Provider>
  );
};
App.propTypes = {
  name: PropTypes.node,
};
export default hot(App);
