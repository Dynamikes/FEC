/* eslint-disable react/prop-types */
import React from 'react'
import { hot } from 'react-hot-loader/root';
import {
  ReviewBreakdownWrapper,
  ReviewAverage,
}
from '../StyledComponents.jsx'
import RatingStars from './RatingStars.jsx'


const ReviewBreakdown = ({reviewsMeta, chars}) => {
  //Variables to hold values
  //Recommended
  // eslint-disable-next-line react/prop-types
  const recommended = Number(reviewsMeta.recommended.true);
  const notRecommended = Number(reviewsMeta.recommended.false);
  //Rating stars

  let one = Number(reviewsMeta.ratings[1])
  let two = Number(reviewsMeta.ratings[2])
  let three = Number(reviewsMeta.ratings[3])
  let four = Number(reviewsMeta.ratings[4])
  let five = Number(reviewsMeta.ratings[5])

  let character = chars

  let fit
  let width
  let comfort
  let length
  let quality
  let size
  // let reviews = [
  //   {
  //     1: one,
  //     2: two,
  //     3: three,
  //     4: four,
  //     5: five
  //   }
  // ]
  for(var key in character) {
    if(key === 'Fit') {fit = character['Fit'].value
  } else if (key === 'Width') {
    width = character['Width'].value
  }else if (key === 'Comfort') {
    comfort = character['Comfort'].value
  }else if (key === 'Length') {
    length = character['Length'].value
  }else if (key === 'Quality') {
    quality = character['Quality'].value
  }else if (key === 'Size') {
    size = character['Size'].value
  }}


  const average = parseFloat(((one * 1) +( two * 2) + (three * 3) + (four * 4) + (five * 5)) / (one + two + three + four + five)).toFixed(1)


  return (
    <ReviewBreakdownWrapper>
      <ReviewAverage>
        {average}
        <RatingStars value={(Number(Math.round(average * 4) / 4).toFixed(2))}/>
      </ReviewAverage>
      <div>
       Review Bars
       Size, Width, Comfort, Quality, Length, Fit
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