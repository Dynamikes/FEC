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

  const [reviews, setReview] = useState([]);
  const [ReviewError, setReviewError] = useState('');
  const [loadedReview, setReviewLoaded] = useState(false);


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
      .then(() => {
        setReviewLoaded(true);
      })
      .catch((err) => {
        setReviewError(err);
        console.log('Breaking in Review GET. Err:', err);
      });
  }, []);

  return(
  <TotalReviewWrapper>
    {console.log('REVIEWS', reviews)}
    <ReviewBreakdown reviews={reviews}/>
    <ReviewList reviews={reviews}/>
  </TotalReviewWrapper>
  );
};

export default hot(Reviews);
