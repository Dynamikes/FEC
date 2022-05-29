/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Title, AddOverlay, AddWrapper } from '../StyledComponents.jsx';
import styled from 'styled-components';
import axios from 'axios';

const BigQAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`;
const QAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  max-height: 80vh;
  overflow-y: scroll;
`;
const QAEntryWrapper = styled.div`
border-width: 2 px;
border-color: orange;
border-style: solid;
padding: 5px;
margin: 10px 1px;
`;
const AnswerListWrapper = styled.div`
max-height: 50vh;
overflow-y: scroll;
`;
const AnswerWrapper = styled.li`
  margin: 10px 20px;
`;
const QASearchBar = styled.input`
  width: 78%;
  height: 30px;
`;
const QASearchButton = styled.input`
  background: black;
  color: gold;
  padding: 8px;
`;
const StyledQuestion = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledQuestionExtensions = styled.div`
  display: flex;
`;
const QAButtons = styled.button`
  padding: 10px;
  margin: 10px;
`;
const AnswerPhotos = styled.div`
  display: flex;
`;
const AnswerPhoto = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 5px;
`;
const UpdateButtons = styled.button`
background: none!important;
  border: none;
  font-family: arial, sans-serif;
  color: gold;
  text-decoration: underline;
  padding: 0px 3px;
  cursor: pointer;
`
const AddForms = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

function AnswerEntry(props) {
  let date = new Date(Date.parse(props.answer.date)).toLocaleDateString('en-us', {month: 'long', day: 'numeric', year: 'numeric'})

  const reportAnswer = () => {
    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${props.answer['id']}/report`,
      method: 'put',
      headers: {
        Authorization: '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',
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
        Authorization: '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',
      },
    })
    .then(()=>{
      props.getQuestions();
    })
    .then(()=> {
      disableHelpful(true);
    })
  }
  const [helpfulStatus, disableHelpful] = useState(false);
  return props.answer['reported'] ? null : (
    <AnswerWrapper>
      <span> {props.answer['body']}</span>
      <AnswerPhotos>
        {props.answer['photos'].length === 0 ? null :
          props.answer['photos'].map((photo, index) => (
            <AnswerPhoto key={index} src={photo}/>
          ))
        }
      </AnswerPhotos>
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

function QAEntry(props) {
  let answerArray = [];
  let questionDate = new Date(Date.parse(props.question['question_date'])).toLocaleDateString('en-us', {month: 'long', day: 'numeric', year: 'numeric'})
  const [answersCount, setAnswersCount] = useState(2);

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
  let sellerArray = [];
  for ( let i = answerArray.length-1; i > 0; i-- ) {
    if (answerArray[i]['answerer_name'].toLowerCase() === 'seller') {
      sellerArray.unshift(answerArray[i]);
      answerArray.splice(i, 1);
    }
  }
  answerArray = sellerArray.concat(answerArray);

  const [answerModal, setAnswerModal] = useState(false);
  const [username, setUsername] = useState('');
  const [answerBody, setAnswerBody] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrls, setPhotoUrls] = useState([]);

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
  const [buttonStatus, disableButton] = useState(false);

  const [photosArray, setUploadPhotos] = useState([]);

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
        Authorization: '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',
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
        Authorization: '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',
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
    // let searchStr = e.target.search.value.toLowerCase();
    // let searchedQuestions = [];
    // for (let i = 0; i < questions.length; i++) {
    //   if (questions[i]['question_body'].toLowerCase().indexOf(searchStr) !== -1) {
    //     searchedQuestions.push(questions[i])
    //   }
    // }
    // setQuestions(searchedQuestions);
    e.target.search.value = '';
  }

  const whileSearching = (e) => {
    let searchStr = e.target.value.toLowerCase();
    if (searchStr.length >= 3) {
      let searchedQuestions = [];
      for (let i = 0; i < questions.length; i++) {
        if (questions[i]['question_body'].toLowerCase().indexOf(searchStr) !== -1) {
          searchedQuestions.push(questions[i])
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
    <form onSubmit={searchQuestions}>
      <QASearchBar name='search' type='text' placeholder='Search for a question here!' onChange={(e)=>{whileSearching(e)}}/>
      <QASearchButton type='submit' value='Search' />
      <QASearchButton type='button' value='Reset' onClick={()=> {setQuestions(questionsHolder)}}/>
    </form>
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

export default hot(QA);



