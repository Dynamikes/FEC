//import React from 'react';
import styled from 'styled-components';
// import { hot } from 'react-hot-loader/root';

export const ImageWrapper = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: auto;
  z-index: 2;
  height: 100%;
  max-width: 100%;
`;

export const ImageViewWrapper = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  z-index: 2;
  width: 400px;
  height: 500px;
  border-color: red;
  border-width: 10px;
  border-style: solid;
`;
export const ExpandButton = styled.button`
  position: absolute;
  right: 1em;
  top: 1em;
  z-index: 2;
  background: black;
  color: gold;
  border-radius: 20%;
  padding: 5px;
`;
export const MainImage = styled.img`
  position: relative;
  height: auto;
  left: 0%;
  width: 70%;
  z-index: 1;
  padding: 0.5em;
`;
export const Thumbnails = styled.div`
  position: absolute;
  width: 10%;
  left: 6%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: white;
  z-index: 2;
`;
export const ThumbnailImage = styled.img`
  height: auto;
`;
export const Flexbox = styled.div`
  display: flex;
  justify-content: center;
  max-width: 90%;
  margin: auto;
`;

export const StyledPageTitle = styled.h1`
  display: flex;
  justify-content: center;
`;
export const AppWrapper = styled.div``;

export const StyledSideBar = styled.div`
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
  display: flex;
  padding: 10px;
  width: 250px;
  height: 100%;
`;
export const HiddenSideBar = styled(StyledSideBar)`
  display: none;
`;
export const StyledProductInfo = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: center;
`;
export const Wrapper = styled.div`
  display: flex;
  justify-self: space-around;
`;
export const StyledProductName = styled.h2`
  display: flex;
  justify-content: center;
  margin: 5px;
`;
export const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const StyledImageView = styled.div`
  display: flex;
  z-index: 2;
`;
export const ProductInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: center;
`;
export const StyledParagraph = styled.p`
  font-size: 0.75em;
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
  color: gold;
`;
export const StyledQuantitySelect = styled.select`
  flex-grow: 2;
  padding: 5px;
  border-width: 3px;
  text-align-last: right;
  background: black;
  color: gold;
`;
export const AddToCartButton = styled.button`
  padding: 10px;
  border-width: 5px;
  background: black;
  color: gold;
  font-size: 1.1em;
`;

export const StyleThumbnail = styled.img`
  border-radius: 50%;
  width: 25%;
  height: auto;
  padding: 5px;
`;
export const StyleSelectorContainer = styled.div``;


//Review Title
export const ReviewTitle = styled.h3`
  display: flex;
  justify-content: center;
`;

//Reviews.jsx -----------------------------
export const  TotalReviewWrapper = styled.div`
display: flex;
flex-direction: row;
background-color: rgb(7, 7, 7);
border-color: green;
border-width: 3px;
border-style: solid;
padding: 5px;
margin: 5px;
`;

//ReviewList.jsx ---------------------------
export const ReviewListWrapper = styled.div`
display: flex;
border-color: gold;
border-width: 3px;
border-style: solid;
flex-direction: column;
max-height: 10px
overflow-y: scroll;
padding: 3px;
margin: 3px;
`;

export const ReviewTile = styled.div`
display: flex;
flex-direction: column;
border-color: gold;
border-width: 3px;
border-style: solid;
padding: 3px;
margin: 3px;
`;

export const ReviewBodyWrapper = styled.div`
display: flex;
flex-direction: column;
padding: 3px;
margin: 3px;
`;

export const ReviewImageWrapper = styled.div`
display: flex;
flex-direction: row;
border-color: gold;
border-width: 1px;
border-style: solid;
padding: 3px;
margin: 3px;
`;

export const ReviewButtonWrapper = styled.div`
display: flex;
flex-direction: row;
`;

export const ReviewBody = styled.p`
border-color: gold;
border-width: 1px;
border-style: solid;
display: flex;
padding: 3px;
margin: 3px;
`;

export const AddTitle = styled.h2`
display: flex;
flex-direction: column;
padding: 5px
`;

export const StarRatingList = styled.div`
display: flex;
flex-direction: column;
border-color: gold;
border-width: 1px;
border-style: solid;
margin: 5px;
padding 3px;
justify-content: center;
font-size: 12px;
`;

export const StarRow = styled.div`
display: flex;
flex-direction: row;
`;

//ReviewBreakdown.jsx ----------------------
export const ReviewBreakdownWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
border-color: gold;
border-width: 3px;
border-style: solid;
padding: 3px;
margin: 3px;
`;

export const ReviewAverage = styled.h2`
border-color: gold;
border-width: 1px;
border-style: solid;
display: flex;
flex-direction: row;
padding: 3px;
margin: 3px;
`;

//AddReview.jsx

export const AddWrapper = styled.div`
background-color: rgba(7,7,7);
border-color: gold;
border-width: 1px;
border-style: solid;
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
padding: 50px;
zIndex: 1000;
`;


export const AddOverlay = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0,0,0,.7);
zIndex: 1000;
`;

export const AddSummaryWrapper = styled.div`
display: flex;
flex-direction: row;
`;