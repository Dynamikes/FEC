/* eslint-disable react/prop-types */
import React from 'react'
import { hot } from 'react-hot-loader/root';
import {
  ReviewBreakdownWrapper,
  ReviewAverage,
}
from '../StyledComponents.jsx'
import RatingStars from './RatingStars.jsx'

const ReviewBreakdown = ({reviewsMeta, getStar, getStars}) => {
  //Variables to hold values
  //Recommended
  // eslint-disable-next-line react/prop-types
  const recommended = Number(reviewsMeta.recommended.true);
  const notRecommended = Number(reviewsMeta.recommended.false);
  //Rating stars

  const one = 1
  const two = 2
  const three = 3
  const four = 4
  const five = 5

  const average = parseFloat(((one * 1) +( two * 2) + (three * 3) + (four * 4) + (five * 5)) / (one + two + three + four + five)).toFixed(1)

  return (
    <ReviewBreakdownWrapper>
      {console.log('THIS', (Number(reviewsMeta.ratings[1])))}

      <ReviewAverage>
        {average}
        <RatingStars getStar={getStar} getStars={getStars} value={(Math.round(average * 4) / 4).toFixed(2)}/>
      </ReviewAverage>
      <div>
        Review bars
      </div>
      <div>
        {(Math.ceil(recommended / (recommended + notRecommended) * 100))}% of reviews recommend this product.
      </div>
      <div>
        breakdown factors
      </div>
    </ReviewBreakdownWrapper>
  )
}

export default hot(ReviewBreakdown)