/* eslint-disable react/prop-types */
import { useState, React } from 'react';
import { hot } from 'react-hot-loader/root';
import {
  ReviewListWrapper,
  ReviewButtonWrapper,
  AddTitle,
  StarRatingList,
  StarRow,
  AddSummaryWrapper
}
from '../StyledComponents.jsx'
import ReviewListEntry from './ReviewListEntry'
import AddReview from './Addreview.jsx'

const ReviewList = ({reviews, getReviews, getStar, getStars}) => {

  //State for various items
  const [reviewCount, setReviewCount] = useState(2);
  const [addIsOpen, setAdd ] = useState(false)

  const [addUsername, setUser] = useState(null)
  const [addSummary, setSummary] = useState(null)
  const [addBody, setBody] = useState(null)
  const [addImages, setImages] = useState([])
  const [addEmail, setEmail] = useState(null)
  const [addRecommend, setRecommend] = useState(null)
  //Characteristics
  //Helpful

  //Fuctions for Add Review
  const countChars = (obj) => {
    if (obj.target.value.length < 50) {
      document.getElementById('count-body').innerHTML = 'Minimum required characters left:'+ (50 - obj.target.value.length)
    }else {
      document.getElementById('count-body').innerHTML = 'Minimum reached'
    }

  }
  const submitAdd = () => {

    setAdd(false);
    alert('Review has been submitted')
    console.log(addUsername, addSummary, addBody, addEmail, addRecommend)
  }

  return (
    <ReviewListWrapper>
      <div>
        {reviews.length} Reviews /*sortedBy*
      </div>
      {reviews.slice(0,reviewCount).map((review, index) => <ReviewListEntry getStars={getStars} getStar={getStar} getReviews={getReviews} key={index} review={review} reviews={reviews}/>)}
      <ReviewButtonWrapper>
        {reviewCount < reviews.length && reviews.length > 2 ? <button onClick={() => { setReviewCount(reviewCount + 2)}}>More Reviews</button> : null}
        <button onClick={()=>{setAdd(true)}}>Add a Review</button>

        <AddReview open={addIsOpen} onClose={() => setAdd(false)}>
          <AddTitle>Write Your Review</AddTitle>
          <h3>About the *Add Product Name*</h3>
          <StarRow>
          <div>Overall rating -Stars-*</div>
          {<StarRatingList>
            <div>
              1 star - Poor
            </div>
            <div>
              2 stars - Fair
            </div>
            <div>
              3 stars - Average
            </div>
            <div>
              4 stars - Good
            </div>
            <div>
              5 stars - Great
            </div>
          </StarRatingList>}
          </StarRow>
          <div>Do you recommend this product?</div>
          <button onClick={() => setRecommend(true)}>Yes</button><button onClick={() => setRecommend(false)}>No</button>
          <div>Characteristics</div>

          <div>Summary</div>
          <AddSummaryWrapper>
          <textarea onChange={(e) => setSummary(e.target.value)} cols='80' rows='1'placeholder='Example: Best purchase ever!'/>
          </AddSummaryWrapper>
          <div>Body</div>
          <textarea onChange={(e) => setBody(e.target.value)} cols='80' rows='2' onKeyUp={(e) => countChars(e)} id="add-body" placeholder='Why did you like the product or not?'/>
          <div id="count-body"></div>
          <div>Images Added</div>
          <button>Upload Photos</button>
          <div>Your Username</div>
          <textarea onChange={(e) => setUser(e.target.value)} placeholder='Example: jackson11!' cols='20' rows='1'/>
          <div>For privacy reasons, do not use your full name or email</div>
          <div>Your Email</div>
          <textarea onChange={(e) => setEmail(e.target.value)}placeholder='Example: jackson11@email.com' cols='30' rows='1'/>
          <div>For authentification reasons, you will not be emailed</div>
          <button onClick={submitAdd}>Submit Review</button>
        </AddReview>

      </ReviewButtonWrapper>
    </ReviewListWrapper>
  )
}

export default hot(ReviewList)