//import React from 'react';
import styled from 'styled-components';
// import { hot } from 'react-hot-loader/root';
import { FaSearch } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: 100%;
  user-select: none;
`;
export const MainImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  object-position: 50% 50%;
`;

export const ImageViewWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
  user-select: none;
`;
export const ExpandButton = styled.button`
  position: absolute;
  right: 1em;
  top: 1em;
  z-index: 2;
  background: black;
  color: orange;
  border-radius: 20%;
  padding: 5px;
`;
export const Thumbnails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  user-select: none;
`;
export const ThumbnailImage = styled.img`
  height: 35px;
  width: 35px;
  margin: 2px;
  border-radius: 50%;
`;
export const Flexbox = styled.div`
  display: flex;
  justify-content: center;
  max-width: 80%;
  margin: auto;
  padding: 10px;
  overflow: scroll;
`;

export const StyledPageTitle = styled.h1`
  display: flex;
  justify-content: center;
`;
export const AppWrapper = styled.div`
  min-width: 480px;
`;

export const StyledSideBar = styled.div`
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
  display: flex;
  padding: 10px;
`;
export const HiddenSideBar = styled(StyledSideBar)`
  display: none;
`;
export const StyledProductInfo = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  max-width: 100%;
`;
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const StyledProductName = styled.h2`
  display: flex;
  justify-content: center;
  margin: 5px;
`;
export const OverviewWrapper = styled.div`
  display: flex;
  overflow: scroll;
`;
export const StyledImageView = styled.div`
  display: flex;
`;
export const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 250px;
`;
export const StyledParagraph = styled.p`
  font-size: 1em;
  margin: 4px;
`;
export const Title = styled.h2`
  align-self: center;
  margin: 5px;
`;
export const CartDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;
export const CartH3 = styled.h2``;
export const SelectorWrapper = styled.div`
  display: flex;
  flex-grow: 2;
  flex-direction: column;
  justify-content: center;
  border: 10px;
`;
export const SelectorH3 = styled.h3`
  background-color: grey;
`;
export const StyledStars = styled.div``;
export const StyledCategory = styled.p`
  margin: 5px;
`;
export const StyledPrice = styled.p`
  margin: 5px;
`;
export const StyledShare = styled.div`
  display: flex;
`;
export const StyledSizeQuantity = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const StyledSizeSelect = styled.select`
  flex-grow: 3;
  justify-content: center;
  padding: 5px;
  border-width: 3px;
  text-align-last: center;
  background: black;
  color: orange;
`;
export const StyledQuantitySelect = styled.select`
  flex-grow: 2;
  padding: 5px;
  border-width: 3px;
  text-align-last: right;
  background: black;
  color: orange;
`;
export const AddToCartButton = styled.button`
  padding: 10px;
  border-width: 5px;
  background: black;
  color: orange;
  font-size: 1.1em;
`;

export const StyleThumbnail = styled.img`
  border-radius: 50%;
  padding: 3px;
  height: 35px;
  width: 35px;
`;
export const HighlightedStyleThumbnail = styled(ThumbnailImage)`
border: 2px solid #dadada;
border-radius: 7px;
outline: none;
border-color: #9ecaed;
box-shadow: 0 0 10px #9ecaed;
`
export const StyleSelectorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
`;

export const BigQAWrapper = styled.div`
display: flex;
flex-direction: column;
padding: 5px;
margin: 5px;
width: 75vw;
border-color: rgb(20 , 20, 20);
border-width: 2px;
border-style: solid;
`;
export const QAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow-y: scroll;
  margin: 10px;
  padding: 10px;
`;
export const QAEntryWrapper = styled.div`
border-width: 1 px;
border-color: grey;
border-style: solid;
padding: 10px;
margin: 10px 5px;
`;
export const AnswerListWrapper = styled.div`
max-height: 50vh;
overflow-y: scroll;
`;
export const AnswerWrapper = styled.li`
  margin: 10px 20px;
`;
export const SearchBarWrapper = styled.form`
  height: 30px;
  width: 95%;
  display: flex;
  justify-content: flex-start;
  margin: 10px 0px;
  padding: 5px;
  align-self: center;
`;
export const QASearchBar = styled.input`
  padding: 5px;
  width: 100%;
`;
export const QASearchButton = styled.input`

`;
export const StyledQuestion = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const StyledQuestionExtensions = styled.div`
  display: flex;
`;
export const QAButtons = styled.button`
  padding: 10px;
  margin: 10px;
`;
export const AnswerPhotos = styled.div`
  display: flex;
`;
export const AnswerPhoto = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 5px;
`;
export const UpdateButtons = styled.button`
background: none!important;
  border: none;
  font-family: arial, sans-serif;
  color: orange;
  text-decoration: underline;
  padding: 0px 3px;
  cursor: pointer;
`
export const AddForms = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  `;

//Review Title
export const ReviewTitle = styled.h3`
  display: flex;
  justify-content: center;
`;

//Reviews.jsx -----------------------------
export const  TotalReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 5px;
  width: 75vw;
  border-color: rgb(20 , 20, 20);
  border-width: 2px;
  border-style: solid;
`;

export const InnerReviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

//ReviewList.jsx ---------------------------
export const ReviewListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 10px;
  width: 10%;
  flex-grow: 1;
  flex-wrap: wrap;
  `;

export const CheckSpan = styled.span`
  color:green;
`;

export const ResponseDiv = styled.div`
  color: gold;
`;

export const ReviewMap = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height:590px;
  width: 100%;
`;

export const ReviewTile = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 1 px;
  border-color: grey;
  border-style: solid;
  padding: 10px;
  margin: 10px 1px;
  word-wrap: break-word;
`;

export const ReviewBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px;
  margin: 3px;
  word-wrap: break-word;
`;

export const ReviewBody = styled.div`
  padding: 3px;
  margin: 3px;
  word-wrap: break-word;
`;

export const ReviewBodyShowMore = styled.div`
display: flex;
flex-direction: column;
`;

export const ReviewImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-color: rgb(20 , 20, 20);
  border-width: 1px;
  border-style: solid;
  padding: 3px;
  margin: 3px;
`;

export const ReviewButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const AddTitle = styled.h2`
  display: flex;
  flex-direction: column;
  padding: 5px
`;

export const StarRatingList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 245px;
  top: 130px;
  border-color: rgb(20 , 20, 20);
  border-width: 5px;
  border-style: solid;
  margin: 5px;
  padding 3px;
  justify-content: center;
  font-size: 22px;
`;

export const StarRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RadioAdd = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CharAdd = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectorAddWrapper = styled.div`

`;

//ReviewBreakdown.jsx ----------------------
export const ReviewBreakdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;
  margin: 10px;
  min-width: 190px;
`;

export const ReviewAverage = styled.h2`
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin: 10px;
`;

export const ProgressBarWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%
`;

export const StarBarWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 5px;
`;

export const InnerBar = styled.div`
  display: flex;
  flex-basis: 60%;
`

export const SliderWrapper = styled.div`
  margin: 10px;
  padding: 5px;
`;

export const SliderInputFit = styled.input`
  -webkit-appearance: none;
  height: 6px;
  width: 75%;
  background-color: grey;
  border-radius: 1px;
  outline: none;
  box-shadow: 0px 1px 10px 1px orange;
  background: radial-gradient(circle at center, white 0, grey 100%);
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: white;
    width: 7px;
    height: 25px;
    border-radius: 8px;
    border: 1px solid #777;
  };
  &:after {
    content: "Too large";
    color: white
  }
  &:before {
    content: "Too small";
    color: white
  }
}
`;

export const SliderInputQuality = styled.input`
  -webkit-appearance: none;
  height: 6px;
  width: 75%;
  background-color: grey;
  border-radius: 1px;
  outline: none;
  box-shadow: 0px 1px 10px 1px orange;
  background: radial-gradient(circle at center, white 0, grey 100%);
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: white;
    width: 7px;
    height: 25px;
    border-radius: 8px;
    border: 1px solid #777;
  };
  &:after {
    content: "Great";
    color: white
  }
  &:before {
    content: "Poor";
    color: white
  }
}
`;

export const RatingHover = styled.small`
  &:hover {
    color: green;
  }
`;

export const SliderInputLength = styled.input`
  -webkit-appearance: none;
  height: 6px;
  width: 75%;
  background-color: grey;
  border-radius: 1px;
  outline: none;
  box-shadow: 0px 1px 10px 1px orange;
  background: radial-gradient(circle at center, white 0, grey 100%);
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: white;
    width: 7px;
    height: 25px;
    border-radius: 8px;
    border: 1px solid #777;
  };
  &:after {
    content: "Too long";
    color: white
  }
  &:before {
    content: "Too short";
    color: white
  }
}
`;

export const RecommendWrap = styled.div`
  margin: 5px
`;

//AddReview.jsx

export const AddWrapper = styled.div`
  background-color: rgba(7,7,7);
  border-color: rgb(20 , 20, 20);
  border-width: 1px;
  border-style: solid;
  position: fixed;
  top: 3%;
  right: 100%
  transform: translate(-50%, -50%);
  padding: 50px;
  z-index: 5;
`;

export const ShowMore = styled.a`
  color: yellow;
  flex-direction: column;
  align-items: flex-end;
  &:hover {
    color: green;
  }
`

export const AddReviewWrapper = styled.div`
  background-color: rgba(7,7,7);
  border-color: rgb(20 , 20, 20);
  border-width: 1px;
  border-style: solid;
  position: fixed;
  overflow: auto;
  height: 80vh;
  top: 3%;
  right: 100%
  transform: translate(-50%, -50%);
  padding: 50px;
  z-index: 5;
`;

export const AddOverlay = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  background-color: rgba(0,0,0, .7);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5
`;
export const ImageOverlay = styled(AddOverlay)`
background-color: grey;
display: flex;
flex-direction: column;
align-items: center;
`
export const AddSummaryWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SearchWrapper = styled.div`
  display: flex;
  width: 65vw;
  padding: 10px;
  margin: 10px;
  margin-left: 1px;
`;

export const ReviewsSearch = styled.input`
  padding: 5px;
  flex: 1;
`;
export const ReviewsSearchButton = styled.input`
  margin: 5px;
  height: 25px;
  width: 25px;
`;
export const StyledSearchIcon = styled(FaSearch)`
  padding: 5px;
  margin: 5px;
  margin-left: 1px;
`;
export const StyledCancelButton = styled(AiFillCloseCircle)`
  padding: 5px;
  margin: 5px;
`;
export const ImagePopUp = styled.img`
  max-height: 80vh;
  max-width: 80vw;
`;
export const CircleRow = styled.div`
display: flex;
justify-content: center;
`
export const SalePrice = styled.span`
  color: red;
  size: 1.1 em;
`;