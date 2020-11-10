import React, { useState } from 'react';
import { RadioGroup } from '@material-ui/core';

import RadioButton from '~/styles/RadioButton';

import { Container } from './styles';
import { Button } from '~/components';

function Questions({ questions, onConfirm }) {
  const [questionSelected, setQuestionSelected] = useState(0);

  function questionChange(_, value) {
    setQuestionSelected(value);
  }

  function confirmAnswer() {
    onConfirm();
  }

  return (
    <Container>
      <h4>Qual o objetivo de estrutura de decisão? Escolha uma alternativa.</h4>
      <RadioGroup
        aria-label="answer"
        name="answer"
        value={questionSelected}
        onChange={questionChange}
      >
        {questions.map(question => (
          <RadioButton
            key={question.id}
            value={question.id.toString()}
            label={question.label}
            checked={questionSelected === question.id.toString()}
          />
        ))}
      </RadioGroup>
      <Button onClick={confirmAnswer}>Confirmar</Button>
    </Container>
  );
}

export default Questions;
