import { hot } from 'react-hot-loader/root';
import ReviewBreakdown from './ReviewBreakdown.jsx';
import axios from 'axios';
import { useState, useEffect, React } from 'react';
import ReviewList from './ReviewList.jsx';
import {
  TotalReviewWrapper
}
from '../StyledComponents.jsx';
import {MAIN_API_KEY} from '../../config.js'

const Reviews = () => {
  //States for user reviews / Meta data
  const [reviews, setReview] = useState([]);
  const [reviewsMeta, setReviewMeta] = useState(
    {recommended: {true: null, false: null}, ratings: {'1': '1', '2': '2', '3': '3', '4': '4', '5': '5'}});
  const [chars, setChars] = useState({Size: 1, Width: 1, Comfort: 1, Quality: 1, Length:1, Fit: 1})
  const [loadedChars, setLoadedChars] = useState(false);


  //helper functions
  const getReviews = () => {
    axios({
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344&&count=100',
      method: 'get',
      headers: {
        Authorization: MAIN_API_KEY,
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
        Authorization: MAIN_API_KEY,
      },
    })
    .then((response) => {
      setChars(response.data.characteristics)
      setReviewMeta(response.data);
    })
    .then(() => {
      setLoadedChars(true);
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
  let chara
  if(loadedChars){chara = chars}

  return(
    <TotalReviewWrapper>
      <ReviewBreakdown
        reviewsMeta={reviewsMeta}
        chars={chara}
      />
      <ReviewList
        reviews={reviews}
        getReviews={getReviews}
      />
    </TotalReviewWrapper>
  );
};

export default hot(Reviews);
