/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
// import styled from 'styled-components';
import axios from 'axios';
import { Title, AddOverlay, AddWrapper, QAEntryWrapper, AnswerListWrapper, StyledQuestion, AnswerPhotos, AnswerPhoto, UpdateButtons, AddForms } from '../StyledComponents.jsx';

import AnswerEntry from './AnswerEntry.jsx'

function QAEntry(props) {
  let answerArray = [];
  let sellerArray = [];
  let questionDate = new Date(Date.parse(props.question['question_date'])).toLocaleDateString('en-us', {month: 'long', day: 'numeric', year: 'numeric'})
  const [answersCount, setAnswersCount] = useState(2);
  const [answerModal, setAnswerModal] = useState(false);
  const [username, setUsername] = useState('');
  const [answerBody, setAnswerBody] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrls, setPhotoUrls] = useState([]);
  const [buttonStatus, disableButton] = useState(false);
  const [photosArray, setUploadPhotos] = useState([]);


  const qHelpfulUpdate = () => {
    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${props.question['question_id']}/helpful`,
      method: 'put',
      headers: {
        Authorization: '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',
      },
    })
    .then(() => {
      props.getQuestions();
    })
    .then(()=> {disableButton(true)})
  };

  if (Object.keys(props.question['answers']).length !== 0) {
    for (let key in props.question.answers) {
      answerArray.push(props.question.answers[key]);
    }
  }
  answerArray.sort((a, b) => (a['helpfulness'] < b['helpfulness']) ? 1 : -1);
  for ( let i = answerArray.length-1; i > 0; i-- ) {
    if (answerArray[i]['answerer_name'].toLowerCase() === 'seller') {
      sellerArray.unshift(answerArray[i]);
      answerArray.splice(i, 1);
    }
  }
  answerArray = sellerArray.concat(answerArray);


  const submitAnswer = (e) => {
    e.preventDefault();

    let answerContent = {
      "name" : username,
      "body" : answerBody,
      "email" : email,
      "question_id" : props.question['question_id'],
      "photos": photoUrls
    };

    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${props.question['question_id']}/answers`,
      method: 'post',
      headers: {
        Authorization: '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',
      },
      data: answerContent
    })
    .then(()=> {
      alert('Answer succesfully submitted!');
      setAnswerModal(false);
    })
    .catch((err) => {console.log(err)})
  }


  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  }

  const handlePhotos = async (e) => {
    e.preventDefault();
    try {
      const file64 = await getBase64(e.target.files[0]);
      let body = new FormData();
      body.append('image', file64);
      await axios({
        url: `https://api.imgbb.com/1/upload?expiration=600&key=71af321260bd6877bf0b3aeb96421ef0`, //api key change
        method: 'post',
        data: body
      })
      .then((results) => {
        if (typeof results['data']['data']['url'] === 'string') {
          setPhotoUrls([...photoUrls, results['data']['data']['url']])
        }
      })
    } catch(err) {
      console.log(err)
      return;
    }
    setUploadPhotos([...photosArray, e.target.files['0']]);
  }

  return props.question['reported'] ? null : (
    <QAEntryWrapper>
      <StyledQuestion>
      <h3> Q: {props.question['question_body']} </h3 >
      <div>
        <small> Helpful? <UpdateButtons disabled={buttonStatus} onClick={()=>{qHelpfulUpdate()}}> Yes ({props.question['question_helpfulness']}) </UpdateButtons> |
          <UpdateButtons onClick={()=>{setAnswerModal(true)}}> Add Answer  </UpdateButtons>
        </small>
        <AddAnswer open={answerModal} onClose={()=>{setAnswerModal(false)}}>
          <AddForms id='answerForm' onSubmit={submitAnswer}>
            <label>
              Username:
              </label>
              <input
                type='text'
                placeholder='Username'
                required
                maxLength='60'
                onChange={(e)=>{setUsername(e.target.value)}}
              />
              <label>
              E-mail:
              </label>
              <input
                type='email'
                placeholder='E-mail'
                required
                maxLength='60'
                onChange={(e)=>{setEmail(e.target.value)}}
              />
            <label>
              Present your answer!
            </label>
            <textarea
              cols='24'
              rows='3'
              placeholder='Place answer here'
              required
              maxLength='1000'
              onChange={(e)=>{setAnswerBody(e.target.value)}}
            />
            <input type='file' disabled={photosArray.length <= 4 ? false : true } accept='image/*' onChange={handlePhotos}/>
            <AnswerPhotos>
              {photosArray.length===0 ? null : photosArray.map((photo, index) => (
                <AnswerPhoto key ={index} src={URL.createObjectURL(photo)}/>
              )) }
            </AnswerPhotos>
            <input type='submit' value='Submit Answer!'/>
        </AddForms>
        </AddAnswer>
      </div>
      </StyledQuestion>
      <div>
        <small>
          Asked by {props.question['asker_name']} on {questionDate}
        </small>
      </div>
      { <AnswerListWrapper>
        {answerArray.length === 0? null : <Title> A: </Title>}
        {answerArray.length === 0 ? 'No documented Answers yet!' :
        answerArray.slice(0, answersCount).map((answer) => (
          <AnswerEntry key={answer['id']} answer={answer} getQuestions={props.getQuestions}/>
        ))}
        { answersCount < answerArray.length && answerArray.length > 1 ?
        <button onClick={()=> {setAnswersCount(answersCount + 1000)}}> Load another answer </button> :
         null
        }
        </AnswerListWrapper>
      }
    </QAEntryWrapper>
  )
}

const AddAnswer=(props) =>{
  return props.open ? (
    <AddOverlay onClick={props.onClose}>
      <AddWrapper onClick={e => e.stopPropagation()}>
        <button onClick={props.onClose}> x </button>
        {props.children}
      </AddWrapper>
    </AddOverlay>
  ) : null;
}

export default hot(QAEntry)