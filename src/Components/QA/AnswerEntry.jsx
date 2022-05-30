/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
// import styled from 'styled-components';
import axios from 'axios';
import { ImagePopUp, AddWrapper, AddOverlay, AnswerWrapper, AnswerPhotos, AnswerPhoto, UpdateButtons, } from '../StyledComponents.jsx';
import { MAIN_API_KEY } from '../../config.js'

function AnswerEntry(props) {
  let date = new Date(Date.parse(props.answer.date)).toLocaleDateString('en-us', {month: 'long', day: 'numeric', year: 'numeric'})
  const [helpfulStatus, disableHelpful] = useState(false);

  const reportAnswer = () => {
    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${props.answer['id']}/report`,
      method: 'put',
      headers: {
        Authorization: MAIN_API_KEY,
      },
    })
    .then(()=>{
      props.getQuestions();
    })
  }

  const aHelpfulUpdate = () => {
    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${props.answer['id']}/helpful`,
      method: 'put',
      headers: {
        Authorization: MAIN_API_KEY,
      },
    })
    .then(()=>{
      props.getQuestions();
    })
    .then(()=> {
      disableHelpful(true);
    })
  }
  const [currentPicture, setCurrentPicture] = useState('');

  return props.answer['reported'] ? null : (
    <AnswerWrapper>
      <span> {props.answer['body']}</span>
      <AnswerPhotos>
          {props.answer['photos'].length === 0 ? null :
            props.answer['photos'].map((photo, index) =>( <AnswerPhoto
                onClick={() => {setCurrentPicture(photo)}}
                key={index}
                src={photo}
              />))
          }
      </AnswerPhotos>
      {currentPicture === '' ? null :
        <AddOverlay onClick={() => setCurrentPicture('')}>
          <AddWrapper>
            <ImagePopUp src={currentPicture} />
          </AddWrapper>
        </AddOverlay>
      }
      <div>
        <small> by
          {props.answer['username'] === 'seller' ? <span><b> Seller </b></span> : <span> {props.answer['answerer_name']} </span>}
          on {date} |
          Helpful?
          <UpdateButtons disabled={helpfulStatus} onClick={()=>{aHelpfulUpdate()}}> Yes ({props.answer.helpfulness})</UpdateButtons>  |
          <UpdateButtons onClick={()=>{reportAnswer()}}> Report </UpdateButtons>
        </small>
        </div>
    </AnswerWrapper>
  );
}

export default hot(AnswerEntry)