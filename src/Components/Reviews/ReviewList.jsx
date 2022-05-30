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
  RadioAdd,
  CharAdd,
  inputWrapper
}
from '../StyledComponents.jsx'
import ReviewListEntry from './ReviewListEntry'
import AddReview from './AddReview.jsx'
import StarRatings from 'react-star-ratings';

const ReviewList = ({reviews, getReviews, chara}) => {

  //State for various items
  const [reviewCount, setReviewCount] = useState(2);
  const [addIsOpen, setAdd ] = useState(false)

  const [addUsername, setUser] = useState(null)
  const [addSummary, setSummary] = useState(null)
  const [addBody, setBody] = useState(null)
  const [addEmail, setEmail] = useState(null)
  const [addRecommend, setRecommend] = useState(null)
  const [addStar, setStar] = useState(0)
  const [addImages, setImages] = useState([])
  const [addFit, setAddFit] = useState('none selected')
  const [fitValue, setFitValue] = useState(0)
  const [addWidth, setAddWidth] = useState('none selected')
  const [WidthValue, setWidthValue] = useState(0)
  const [addComfort, setAddComfort] = useState('none selected')
  const [ComfortValue, setComfortValue] = useState(0)
  const [addQuality, setAddQuality] = useState('none selected')
  const [QualityValue, setQualityValue] = useState(0)
  const [addLength, setAddLength] = useState('none selected')
  const [LengthValue, setLengthValue] = useState(0)
  const [addSize, setAddSize] = useState('none selected')
  const [SizeValue, setSizeValue] = useState(0)


  //Characteristics
  //Helpful
  let fit
  let value
  let comfort
  let length
  let quality
  let size
  let chars = chara;

  for(var key in chars) {
    if(key === 'Fit') {fit = chars['Fit'].value
  }else if (key === 'Comfort') {
    comfort = chars['Comfort'].value
  }else if (key === 'Length') {
    length = chars['Length'].value
  }else if (key === 'Quality') {
    quality = chars['Quality'].value
  }else if (key === 'Size') {
    size = chars['Size'].value
  }else if (key === 'Value') {
    value = chars['Value'].value
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
    e.preventDefault()
    setAdd(false);
    alert('Review has been submitted')
    console.log(addUsername, addSummary, addBody, addEmail, addRecommend, addStar)
  }

  return (
    <ReviewListWrapper>
      <input type='text' />
      <ReviewMap>
        {console.log('CAHNGE', addFit)}
       { console.log('VALUES', fitValue)}
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
            <RadioAdd>
              <div>Yes:</div>
              <input onClick={() => setRecommend(true)} required type="radio" name="addAnswer" />
              <div>No:</div>
              <input onClick={() => setRecommend(false)} required type="radio" name="addAnswer" />
            </RadioAdd>
            <CharAdd>
              
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
              <u>Width: {addWidth}</u>
              <div>
                <input
                  onClick={() => {setAddWidth('Too narrow'), setWidthValue(1)}} required type="radio" name="addWidth"
                />
                <input
                  onClick={() => {setAddWidth('Slightly narrow'), setWidthValue(2)}} required type="radio" name="addWidth"
                />
                <input
                 onClick={() => {setAddWidth('Perfect'), setWidthValue(3)}} required type="radio" name="addWidth"
                />
                <input
                 onClick={() => {setAddWidth('Slightly wide'), setWidthValue(4)}} required type="radio" name="addWidth"
                />
                <input
                  onClick={() => {setAddWidth('Too wide'), setWidthValue(5)}} required type="radio" name="addWidth"
                />
              </div>
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
            <input type='submit' onSubmit={()=>{submitAdd()}} value='Submit Review'/>
          </form>
        </AddReview>
      </ReviewButtonWrapper>
    </ReviewListWrapper>
  )
}

export default hot(ReviewList)