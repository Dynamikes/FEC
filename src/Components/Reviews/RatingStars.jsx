/* eslint-disable react/prop-types */
import React from 'react';
import { hot } from 'react-hot-loader/root';
import StarRatings from 'react-star-ratings';

 const Rating = ({value}) => {

  return (
    <div>
      <StarRatings
        rating={Number(value)}
        starRatedColor="gold"
        starDimension='20px'
        starSpacing={'2px'}
      />
    </div>
  )
}

export default hot(Rating);