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
  const [reviewsMeta, setReviewMeta] = useState({recommended: {true: null, false: null}});

  //Get for reviews user data
  useEffect(() => {
    axios({
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344',
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
  }, []);

  //Get for reviews Meta Data
  useEffect(() => {
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
  }, []);

  return(
  <TotalReviewWrapper>
    {console.log('REVIEWSMeta', reviewsMeta)}
    <ReviewBreakdown reviewsMeta={reviewsMeta}/>
    <ReviewList reviews={reviews}/>
  </TotalReviewWrapper>
  );
};

export default hot(Reviews);
