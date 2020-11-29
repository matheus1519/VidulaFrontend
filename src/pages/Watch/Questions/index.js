import React, { useState } from 'react';
import { RadioGroup } from '@material-ui/core';

import RadioButton from '~/styles/RadioButton';

import { Container } from './styles';
import { Button } from '~/components';

function Questions({ teste, onConfirm }) {
  const [questionSelected, setQuestionSelected] = useState(0);

  const testeMapped = {
    question: teste.pergunta,
    alternative1: teste.alternativa1,
    alternative2: teste.alternativa2,
    alternative3: teste.alternativa3,
    alternative4: teste.alternativa4,
    alternative5: teste.alternativa5,
    rightAlternative: teste.alternativaCerta,
  };

  function questionChange(_, value) {
    setQuestionSelected(value);
  }

  function confirmAnswer() {
    onConfirm(questionSelected === testeMapped.rightAlternative);
  }

  return (
    <Container>
      <h4>{testeMapped.question}</h4>
      <RadioGroup
        aria-label="answer"
        name="answer"
        value={questionSelected}
        onChange={questionChange}
      >
        <RadioButton
          value="alternative1"
          label={testeMapped.alternative1}
          checked={questionSelected === 'alternative1'}
        />
        <RadioButton
          value="alternative2"
          label={testeMapped.alternative2}
          checked={questionSelected === 'alternative2'}
        />
        <RadioButton
          value="alternative3"
          label={testeMapped.alternative3}
          checked={questionSelected === 'alternative3'}
        />
        <RadioButton
          value="alternative4"
          label={testeMapped.alternative4}
          checked={questionSelected === 'alternative4'}
        />
        <RadioButton
          value="alternative5"
          label={testeMapped.alternative5}
          checked={questionSelected === 'alternative5'}
        />
      </RadioGroup>
      <Button onClick={confirmAnswer}>Confirmar</Button>
    </Container>
  );
}

export default Questions;
