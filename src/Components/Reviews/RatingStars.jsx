/* eslint-disable react/prop-types */
import React from 'react';
import { hot } from 'react-hot-loader/root';
 const Rating = ({value, getStar, getStars}) => {

  return (
    <div>
      {getStars(value).map((value, index) => (
        <img width={25} src={getStar(value)} key={index}/>
      ))}
    </div>
  )
}

export default hot(Rating);