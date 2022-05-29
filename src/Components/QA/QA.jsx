/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';
import axios from 'axios';
import { Title, AddOverlay, AddWrapper, BigQAWrapper, QAWrapper, QASearchBar, QASearchButton, StyledQuestionExtensions, QAButtons, AddForms } from '../StyledComponents.jsx';
import { MAIN_API_KEY } from '../../config.js'
import QAEntry from './QAEntry.jsx'

const SearchWrapper = styled.div`
  display: flex;
`;

function QA() {
  const [questions, setQuestions] = useState([]);
  const [questionsHolder, setHolder] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [questionsCount, setCount] = useState(4);
  const [addQuestion, openAddQuestion] = useState(false);
  const [username, setUsername] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [email, setEmail] = useState('');

  let product_id = 40360;
  const getQuestions= () => {
    axios({
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=' + product_id,
      method: 'get',
      headers: {
        Authorization: MAIN_API_KEY,
      },
    })
    .then ((data) => {
      let questions = data.data.results;
      questions.sort((a, b) => (a['question_helpfulness'] < b['question_helpfulness']) ? 1 : -1)
      setQuestions(questions);
      setHolder(questions);
    })
    .then(() => {setLoaded(true)})
    .catch((err) => {console.log(err)})
  }


  useEffect(() => {
    getQuestions();
  }, [])

  const submitQuestion = (e) => {
    e.preventDefault();
    let questionContent = {
      "name" : username,
      "body" : questionBody,
      "email" : email,
      "product_id" : product_id
    };
    axios({
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
      method: 'post',
      headers: {
        Authorization: MAIN_API_KEY,
      },
      data: questionContent
    })
    .then(()=> {
      alert('Question succesfully submitted!');
      openAddQuestion(false);
    })
    .catch((err) => {
      console.log(err)
      alert('Incorrect submission! Please ensure all fields are appropriately filled')
    })
  }

  const searchQuestions = (e) => {
    e.preventDefault();
    e.target.search.value = '';
  }

  const whileSearching = (e) => {
    let searchStr = e.target.value.toLowerCase();
    console.log('typing: ', e.target.value)
    if (searchStr.length > 2) {
      let searchedQuestions = [];
      for (let i = 0; i < questionsHolder.length; i++) {
        if (questionsHolder[i]['question_body'].toLowerCase().includes(searchStr)) {
          searchedQuestions.push(questionsHolder[i])
        }
      }
      setQuestions(searchedQuestions);
    } else {
      setQuestions(questionsHolder);
    }
  }

  return (
    <BigQAWrapper display='flex'>
    <Title> Questions and Answers </Title>
    <SearchWrapper>
      <form onSubmit={searchQuestions}>
        <QASearchBar name='search' type='text' placeholder='Search for a question here!' onChange={(e)=>{whileSearching(e)}}/>
        <QASearchButton type='submit' value='X' onClick={()=> {setQuestions(questionsHolder)}}/>
      </form>
    </SearchWrapper>
    <QAWrapper>
    { loaded ? questions.length === 0 ? <h3> No questions have been asked about this product yet! </h3> :
      questions.slice(0, questionsCount).map((question) => (
      <QAEntry key={question['question_id']} question={question} getQuestions={getQuestions}/>
      )) :
    ''}
    <StyledQuestionExtensions>
      {questionsCount < questions.length && questions.length > 2 ?
        <QAButtons size='large' onClick={()=> {setCount(questionsCount + 2)}}> More Answered Questions</QAButtons> :
        null
      }
      <QAButtons size ='large' onClick={()=>{openAddQuestion(true)}}> Add a Question + </QAButtons>
    </StyledQuestionExtensions>
    <AddQuestion open={addQuestion} onClose={()=>{openAddQuestion(false)}} submitQuestion={submitQuestion}>
      <AddForms onSubmit={submitQuestion}>
        <Title> Ask your Question About the (Product)</Title>
        <label>
          Ask your question!<small>*</small>
        </label>
        <textarea
          cols='40'
          rows='4'
          placeholder='Ask a Question'
          required
          maxLength='1000'
          onChange={(e)=>{setQuestionBody(e.target.value)}}
        />
        <label>
          What is your nickname<small>*</small>:
          </label>
          <input
            type='text'
            maxLength='60'
            placeholder='"Example: jackson11!"'
            required
            onChange={(e)=>{setUsername(e.target.value)}}
          />
          <small> For privacy reasons, do not use your full name or email address </small>
          <label>
          What is your email <small>*</small>:
          </label>
          <input
            type='email'
            placeholder='Why did you like the product or not?'
            required
            maxLength='60'
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <small> For authentication reasons only; you will not be emailed. </small>
        <input type='submit' value='Submit Question!'/>
      </AddForms>
    </AddQuestion>
  </QAWrapper>
  </BigQAWrapper>);
}
  const AddQuestion=(props) =>{
    return props.open ? (
      <AddOverlay onClick={props.onClose}>
        <AddWrapper onClick={e => e.stopPropagation()}>
          <button onClick={props.onClose}> x </button>
          {props.children}
        </AddWrapper>
      </AddOverlay>
    ) : null;
  }

export default hot(QA);



