/* eslint-disable react/prop-types */
import { useState, React } from 'react';
import { hot } from 'react-hot-loader/root';
import {
  ReviewListWrapper,
  ReviewButtonWrapper,
  AddTitle,
  StarRatingList,
  StarRow,
  AddSummaryWrapper,
  ReviewMap,
  ReviewsSearch,
  SearchBarWrapper,
  StyledSearchIcon
}
from '../StyledComponents.jsx'
import ReviewListEntry from './ReviewListEntry'
import AddReview from './AddReview.jsx'
import StarRatings from 'react-star-ratings';

const ReviewList = ({reviews, getReviews, reviewsHolder, setReviews}) => {

  //State for various items
  const [reviewCount, setReviewCount] = useState(2);
  const [addIsOpen, setAdd ] = useState(false)

  const [addUsername, setUser] = useState(null)
  const [addSummary, setSummary] = useState(null)
  const [addBody, setBody] = useState(null)
  const [addEmail, setEmail] = useState(null)
  const [addRecommend, setRecommend] = useState(null)
  const [addStar, setStar] = useState(0)
  const [factors, setFactors] = useState(null)
  const [addImages, setImages] = useState([])

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
    console.log(addUsername, addSummary, addBody, addEmail, addRecommend, addStar)
  }

  const searched = (e) => {
    e.preventDefault();
    e.target.search.value='';
  }

  const whileSearching = (e) => {
    let searchStr = e.target.value.toLowerCase();
    if (searchStr.length > 2) {
      let searchedReviews = [];
      for (let i = 0; i < reviewsHolder.length; i++) {
        if (
          reviewsHolder[i]['body'].toLowerCase().includes(searchStr) ||
          reviewsHolder[i]['reviewer_name'].toLowerCase().includes(searchStr) ||
          reviewsHolder[i]['summary'].toLowerCase().includes(searchStr)
        ) {
          searchedReviews.push(reviewsHolder[i])
        }
      }
      setReviews(searchedReviews);
    } else {
      setReviews(reviewsHolder);
    }
  }

  return (
    <ReviewListWrapper>
      <SearchBarWrapper onSubmit={(e)=>{searched(e)}}>
      <StyledSearchIcon />
        <ReviewsSearch type='text' name='search'
          placeholder='Filter reviews here!'
          onChange={(e)=>{whileSearching(e)}}
        />
        <input type='submit' value='x'onClick={()=> {setReviews(reviewsHolder)}} />
      </SearchBarWrapper>
      <ReviewMap>
        <div>
          {reviews.length} Reviews /*sortedBy*
        </div>
        {reviews.slice(0,reviewCount).map((review, index) =>
        <ReviewListEntry
            getReviews={getReviews}
            key={index}
            review={review}
            reviews={reviews}
          />
        )}
      </ReviewMap>
      <ReviewButtonWrapper>
        {reviewCount < reviews.length && reviews.length > 2 ?
          <button onClick={() => { setReviewCount(reviewCount + 2)}}>More Reviews</button> :
          null
        }
        <button onClick={()=>{setAdd(true)}}>Add a Review</button>
        <AddReview open={addIsOpen} onClose={() => setAdd(false)}>
          <form>
            <AddTitle>Write Your Review</AddTitle>
            <h3>About the *Add Product Name*</h3>
            <StarRow>
              <div>
                <StarRatings
                  rating={addStar}
                  starRatedColor="gold"
                  starDimension={'25px'}
                  starSpacing={'2px'}
                  changeRating={(e)=>{setStar(e)}}
                  required
                />
            </div>
              {addStar > 0 ?
              <StarRatingList>
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
              </StarRatingList> : null}
            </StarRow>
            <div required>Do you recommend this product?</div>
            <button onClick={() => setRecommend(true)}>{addRecommend ? '✓' : ''}Yes</button>
            <button onClick={() => setRecommend(false)}>{addRecommend === false ? '✓' : ''}No</button>
            <div required>Characteristics</div>
            <div>Summary</div>
            <AddSummaryWrapper>
              <textarea
                required
                onChange={(e) => setSummary(e.target.value)}
                cols='80'
                rows='1'
                placeholder='Example: Best purchase ever!'
              />
            </AddSummaryWrapper>
            <div>Body</div>
            <textarea
              required
              onChange={(e) => setBody(e.target.value)}
              cols='80'
              rows='2'
              onKeyUp={(e) => countChars(e)}
              id="add-body"
              placeholder='Why did you like the product or not?'
            />
            <div id="count-body"></div>
            <div>Images Added</div>
            <button>Upload Photos</button>
            <div>Your Username</div>
            <textarea
              required
              onChange={(e) => setUser(e.target.value)}
              placeholder='Example: jackson11!'
              cols='20'
              rows='1'
            />
            <div>For privacy reasons, do not use your full name or email</div>
            <div>Your Email</div>
            <textarea
              required
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Example: jackson11@email.com'
              cols='30'
              rows='1'
            />
            <div>For authentification reasons, you will not be emailed</div>
            <input type='submit' onSubmit={()=>{console.log('yes')}} value='Submit Review'/>
          </form>
        </AddReview>
      </ReviewButtonWrapper>
    </ReviewListWrapper>
  )
}

export default hot(ReviewList)