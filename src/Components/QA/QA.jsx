import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Title } from '../StyledComponents.jsx';
import styled from 'styled-components';

const QAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`;
const QASearchBar = styled.input`
  width: 100%;
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

function QAEntry(props) {
  return (
    <section>
      <StyledQuestion>
      <h3> Q: Placeholder Question </h3 >
      <div> <small>Helpful? Yes (3)  |  Add Answer </small></div>
      </StyledQuestion>
      <div>
        <b> A: </b> Placeholder answer
        <div> <small> by username, at a date | Helpful? Yes (3)  |  Report </small></div>
        <div> <small> Load more answers </small></div>
      </div>
      <StyledQuestionExtensions>
        <QAButtons size='large' > More Answered Questions</QAButtons>
        <QAButtons size ='large' > Add a Question + </QAButtons>
      </StyledQuestionExtensions>
    </section>

  )
}

function QA() {
  return (
  <QAWrapper>
    <Title> Questions and Answers </Title>
    <form >
      <QASearchBar type='text' placeholder='Search for a question here!'/>
      <input type='button' value='search' />
    </form>
    <QAEntry/>
  </QAWrapper>);
}

export default hot(QA);
