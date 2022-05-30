/* eslint-disable react/prop-types */
import { useContext, useState, React } from 'react';
import { hot } from 'react-hot-loader/root';
import {
  ReviewListWrapper,
  ReviewButtonWrapper,
  AddTitle,
  StarRatingList,
  StarRow,
  AddSummaryWrapper,
  ReviewMap,
  RadioAdd,
  CharAdd,
  inputWrapper,
  ReviewsSearch,
  SearchBarWrapper
}
from '../StyledComponents.jsx';
import ReviewListEntry from './ReviewListEntry';
import AddReview from './AddReview.jsx';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import {MAIN_API_KEY} from '../../config.js'
import {prodIDContext} from '../../App.jsx'

const ReviewList = ({reviews, getReviews, chara, reviewsHolder, setReviews}) => {

  const prodID2 = useContext(prodIDContext)
  //State for various items
  const [reviewCount, setReviewCount] = useState(2);
  const [addIsOpen, setAdd ] = useState(false)

  const [addUsername, setUser] = useState('')
  const [addSummary, setSummary] = useState('')
  const [addBody, setBody] = useState('')
  const [addEmail, setEmail] = useState('')
  const [addRecommend, setRecommend] = useState(null)
  const [addStar, setStar] = useState(0)
  const [addImages, setImages] = useState([])
  const [addFit, setAddFit] = useState('none selected')
  const [fitValue, setFitValue] = useState(0)
  const [addValue, setAddValue] = useState('none selected')
  const [valueValue, setValueValue] = useState(0)
  const [addComfort, setAddComfort] = useState('none selected')
  const [comfortValue, setComfortValue] = useState(0)
  const [addQuality, setAddQuality] = useState('none selected')
  const [qualityValue, setQualityValue] = useState(0)
  const [addLength, setAddLength] = useState('none selected')
  const [lengthValue, setLengthValue] = useState(0)
  const [addSize, setAddSize] = useState('none selected')
  const [sizeValue, setSizeValue] = useState(0)


  //Characteristics
  //Helpful
  let fitAdd
  let valueAdd
  let comfortAdd
  let lengthAdd
  let qualityAdd
  let sizeAdd
  let charas = chara;

  for(var key in charas) {
    if(key === 'Fit') {fitAdd = charas['Fit'].value
  }else if (key === 'Comfort') {
    comfortAdd = charas['Comfort'].value
  }else if (key === 'Length') {
    lengthAdd = charas['Length'].value
  }else if (key === 'Quality') {
    qualityAdd = charas['Quality'].value
  }else if (key === 'Size') {
    sizeAdd = charas['Size'].value
  }else if (key === 'Value') {
    valueAdd = charas['Value'].value
  }}


  //Fuctions for Add Review
  const countChars = (obj) => {
    if (obj.target.value.length < 50) {
      document.getElementById('count-body').innerHTML = 'Minimum required characters left:'+ (50 - obj.target.value.length)
    }else {
      document.getElementById('count-body').innerHTML = 'Minimum reached'
    }

  }
  const submitAdd = (e) => {
    e.preventDefault();
    let addReviewContent = {
      "rating": addStar,
      "summary": addSummary,
      "body": addBody,
      "recommend": addRecommend,
      "name": addUsername,
      "email": addEmail,
      "Photos": [],
      "characteristics": {}
    };
    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${prodID2}`,
      method: 'post',
      headers: {
        Authorization: MAIN_API_KEY,
      },
      data: addReviewContent
    })
    .then(()=> {
      alert('Review successfully submitted!');
      setAdd(false);
    })
    .catch((err) => {
      console.log(err)
      alert('Incorrect submission! Please ensure all fields are appropriately filled')
    })
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
          <form onSubmit={submitAdd}>
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
            <RadioAdd>
              <div>Yes:</div>
              <input onClick={() => setRecommend(true)} required type="radio" name="addAnswer" />
              <div>No:</div>
              <input onClick={() => setRecommend(false)} required type="radio" name="addAnswer" />
            </RadioAdd>
            <CharAdd>
              {fitAdd ?
              <div>
                <u>Fit: {addFit}</u>
                <div>
                  <input
                    onClick={() => {setAddFit('Runs tight'), setFitValue(1)}} required type="radio" name="addFit"
                  />
                  <input
                    onClick={() => {setAddFit('Runs slightly tight'), setFitValue(2)}} required type="radio" name="addFit"
                  />
                  <input
                  onClick={() => {setAddFit('Perfect'), setFitValue(3)}} required type="radio" name="addFit"
                  />
                  <input
                  onClick={() => {setAddFit('Runs slightly long'), setFitValue(4)}} required type="radio" name="addFit"
                  />
                  <input
                    onClick={() => {setAddFit('Runs long'), setFitValue(5)}} required type="radio" name="addFit"
                  />
                </div>
              </div>
              : null}
              {valueAdd ?
              <div>
                <u>Value: {addValue}</u>
                <div>
                  <input
                    onClick={() => {setAddValue('Too narrow'), setValueValue(1)}} required type="radio" name="addValue"
                  />
                  <input
                    onClick={() => {setAddValue('Slightly narrow'), setValueValue(2)}} required type="radio" name="addValue"
                  />
                  <input
                  onClick={() => {setAddValue('Perfect'), setValueValue(3)}} required type="radio" name="addValue"
                  />
                  <input
                  onClick={() => {setAddValue('Slightly wide'), setValueValue(4)}} required type="radio" name="addValue"
                  />
                  <input
                    onClick={() => {setAddValue('Too wide'), setValueValue(5)}} required type="radio" name="addValue"
                  />
                </div>
              </div> : null}
                {comfortAdd ?
             <div>
                <u>Comfort: {addComfort}</u>
                <div>
                  <input
                    onClick={() => {setAddComfort('Uncomfortable'), setComfortValue(1)}} required type="radio" name="addComfort"
                  />
                  <input
                    onClick={() => {setAddComfort('Slightly uncomfortable'), setComfortValue(2)}} required type="radio" name="addComfort"
                  />
                  <input
                  onClick={() => {setAddComfort('Ok'), setComfortValue(3)}} required type="radio" name="addComfort"
                  />
                  <input
                  onClick={() => {setAddComfort('Comfortable'), setComfortValue(4)}} required type="radio" name="addComfort"
                  />
                  <input
                    onClick={() => {setAddComfort('Perfect'), setComfortValue(5)}} required type="radio" name="addComfort"
                  />
               </div>
            </div>
              : null}
              {qualityAdd ?
              <div>
                <u>Quality: {addQuality}</u>
                <div>
                  <input
                    onClick={() => {setAddQuality('Uncomfortable'), setQualityValue(1)}} required type="radio" name="addQuality"
                  />
                  <input
                    onClick={() => {setAddQuality('Slightly uncomfortable'), setQualityValue(2)}} required type="radio" name="addQuality"
                  />
                  <input
                  onClick={() => {setAddQuality('Ok'), setQualityValue(3)}} required type="radio" name="addQuality"
                  />
                  <input
                  onClick={() => {setAddQuality('Comfortable'), setQualityValue(4)}} required type="radio" name="addQuality"
                  />
                  <input
                    onClick={() => {setAddQuality('Perfect'), setQualityValue(5)}} required type="radio" name="addQuality"
                  />
                </div>
              </div>
              : null}
              {lengthAdd ?
              <div>
              <u>Length: {addLength}</u>
                <div>
                  <input
                    onClick={() => {setAddLength('Runs short'), setLengthValue(1)}} required type="radio" name="addLength"
                  />
                  <input
                    onClick={() => {setAddLength('Runs slightly short'), setLengthValue(2)}} required type="radio" name="addLength"
                  />
                  <input
                  onClick={() => {setAddLength('Perfect'), setLengthValue(3)}} required type="radio" name="addLength"
                  />
                  <input
                  onClick={() => {setAddLength('Runs slightly long'), setLengthValue(4)}} required type="radio" name="addLength"
                  />
                  <input
                    onClick={() => {setAddLength('Runs long'), setLengthValue(5)}} required type="radio" name="addLength"
                  />
                </div>
              </div> : null}
            {sizeAdd ?
              <div>
                <u>Size: {addSize}</u>
                <div>
                  <input
                    onClick={() => {setAddSize('Runs tight'), setSizeValue(1)}} required type="radio" name="addSize"
                  />
                  <input
                    onClick={() => {setAddSize('Runs slightly tight'), setSizeValue(2)}} required type="radio" name="addSize"
                  />
                  <input
                  onClick={() => {setAddSize('Perfect'), setSizeValue(3)}} required type="radio" name="addSize"
                  />
                  <input
                  onClick={() => {setAddSize('Runs slightly long'), setSizeValue(4)}} required type="radio" name="addSize"
                  />
                  <input
                    onClick={() => {setAddSize('Runs long'), setSizeValue(5)}} required type="radio" name="addSize"
                  />
                </div>
              </div> : null}
            </CharAdd>
            <div>Summary</div>
            <AddSummaryWrapper>
              <textarea
                required

                maxLength='60'
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
              maxLength='1000'
              minLength='50'
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
              maxLength='60'
            />
            <div><small>For privacy reasons, do not use your full name or email</small></div>
            <div>Your Email</div>
            <input
              required
              maxLength='60'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Example: jackson11@email.com'
              cols='30'
              rows='1'
            />
            <div><small>For authentification reasons, you will not be emailed</small></div>
            <input type='submit' value='Submit Review'/>
          </form>
        </AddReview>
      </ReviewButtonWrapper>
    </ReviewListWrapper>
  )
}

export default hot(ReviewList)