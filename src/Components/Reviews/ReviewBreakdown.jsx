import React from 'react'
import { hot } from 'react-hot-loader/root';
import {
  ReviewBreakdownWrapper
}
from '../StyledComponents.jsx'

const ReviewBreakdown = () => {

  return (
    <ReviewBreakdownWrapper>
      --Rating Breakdown--
      <div>
        Star # + average
      </div>
      <div>
        Review bars
      </div>
      <div>
        % recommended
      </div>
      <div>
        breakdown factors
      </div>
    </ReviewBreakdownWrapper>
  )
}

export default hot(ReviewBreakdown)