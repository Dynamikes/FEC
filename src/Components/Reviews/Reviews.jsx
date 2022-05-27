import { hot } from 'react-hot-loader/root';
import ReviewBreakdown from './ReviewBreakdown.jsx';
import axios from 'axios';
import { useState, useEffect, React } from 'react';
import ReviewList from './ReviewList.jsx';
import {
  TotalReviewWrapper
}
from '../StyledComponents.jsx';

const Reviews = () => {
  //States for user reviews / Meta data
  const [reviews, setReview] = useState([]);
  const [reviewsMeta, setReviewMeta] = useState(
    {recommended: {true: null, false: null}, ratings: {1: null, 2: null, 3: null, 4: null, 5: null}});


  //helper functions
   const getReviews = () => {
    axios({
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344&&count=100',
      method: 'get',
      headers: {
        Authorization: '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',
      },
    })
      .then((response) => {
        setReview(response.data.results);
      })
      .catch((err) => {
        console.log('Breaking in Review GET. Err:', err);
      });
   }

   const getMeta = () => {
    axios({
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=40344',
      method: 'get',
      headers: {
        Authorization: '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',
      },
    })
      .then((response) => {
        setReviewMeta(response.data);
      })
      .catch((err) => {
        console.log('Breaking in ReviewMeta GET. Err:', err);
      });
  }

  //Get for reviews user data
  useEffect(() => {
    getReviews();
  }, []);

  //Get for reviews Meta Data
  useEffect(() => {
    getMeta();
  }, []);

  //For use with stars
  let full = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Star%2A.svg/1920px-Star%2A.svg.png"
  let threeQuart = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Star%C2%BE.svg/1920px-Star%C2%BE.svg.png'
  let half = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Star%C2%BD.svg/1920px-Star%C2%BD.svg.png"
  let quart = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Star%C2%BC.svg/1920px-Star%C2%BC.svg.png"
  let empty = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Star-.svg/1920px-Star-.svg.png"

  const getStar = (value) => {
    switch (value) {
      case 0:
        return empty
      case 25:
        return quart
      case 50:
        return half
      case 75:
        return threeQuart
      case 100:
        return full
    }
  }

  const getStars = (value) => {
    switch(parseFloat(value)) {
      case 0.0:
        return [0,0,0,0,0];
      case 0.25:
        return [25,0,0,0,0];
      case 0.50:
        return [50,0,0,0,0];
      case 0.75:
        return [75,0,0,0,0];
      case 1.00:
        return [100,0,0,0,0];
      case 1.25:
       return [100,25,0,0,0];
      case 1.50:
        return [100,50,0,0,0];
      case 1.75:
        return [100,75,0,0,0];
      case 2.00:
        return [100,100,0,0,0];
      case 2.25:
        return [100,100,25,0,0];
      case 2.50:
       return [100,100,50,0,0];
      case 2.75:
        return [100,100,75,0,0];
      case 3.00:
        return [100,100,100,0,0];
      case 3.25:
        return [100,100,100,25,0];
      case 3.50:
        return [100,100,100,50,0];
      case 3.75:
        return [100,100,100,75,0];
      case 4.00:
        return [100,100,100,100,0];
      case 4.25:
        return [100,100,100,100,25];
      case 4.50:
        return [100,100,100,100,50];
      case 4.75:
        return [100,100,100,100,75];
      case 5.00:
        return [100,100,100,100,100];
    }
  }

  return(
  <TotalReviewWrapper>
    {console.log('REVIEWS', reviewsMeta)}
    <ReviewBreakdown reviewsMeta={reviewsMeta} getStar={getStar} getStars={getStars}/>
    <ReviewList reviews={reviews} getReviews={getReviews} getStar={getStar} getStars={getStars}/>
  </TotalReviewWrapper>
  );
};

export default hot(Reviews);
