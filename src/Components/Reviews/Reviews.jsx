import React from 'react';
import { hot } from 'react-hot-loader/root';
import ReviewBreakdown from './ReviewBreakdown.jsx';
import ReviewList from './ReviewList.jsx'
import {
  TotalReviewWrapper
}
from '../StyledComponents.jsx'

const Reviews = () => {

  return(
  <TotalReviewWrapper>
    <ReviewBreakdown/>
    <ReviewList/>
  </TotalReviewWrapper>
  );
};

export default hot(Reviews);
