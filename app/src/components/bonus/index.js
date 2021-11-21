import React, { useContext, useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';

import FormPlayer from '../form-player';
import FormNumber from '../form-number';
import FormPlayerNumber from '../form-player-number';
import { InputContext } from '../../contexts';

//---------------------------------------------------------------------

const Bonus = () => {
  const { input, setInput } = useContext(InputContext);

  const [checked, setChecked] = useState(false);
  const [question, setQuestion] = useState('');
  const [points, setPoints] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [bonusResult, setBonusResult] = useState();

  const handleSwitchChange = () => {
    setChecked(!checked);
  };

  const handleQuestionChange = e => {
    setQuestion(e.target.value);
  };

  const handlePointChange = e => {
    setPoints(e.target.value);
  };

  const handleQuestionTypeChange = e => {
    setQuestionType(e.target.value);
  };

  const renderQuestionType = () => {
    switch (questionType) {
      case 'player':
        return <FormPlayer label="Enter Player" overrideDefault={setBonusResult} />;
      case 'number':
        return <FormNumber label="Enter Number" overrideDefault={setBonusResult} />;
      case 'playerNumber':
        return (
          <FormPlayerNumber
            primaryLabel="Enter Player"
            secondaryLabel="Enter Number"
            overrideDefault={setBonusResult}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (question && points && questionType) {
      setInput({
        ...input,
        bonus: {
          type: questionType,
          point: parseInt(points, 10),
          text: `${question}:`,
          answer: bonusResult,
        },
      });
    }
  }, [question, points, questionType, bonusResult]);

  return (
    <FormGroup>
      <FormControlLabel
        sx={{ maxWidth: 200, mb: 1 }}
        control={<Switch checked={checked} onChange={handleSwitchChange} />}
        label="Bonus Question"
      />
      {checked && (
        <>
          <Box sx={{ display: 'flex' }}>
            <TextField
              autoComplete="off"
              sx={{ minWidth: 100 }}
              id="outlined-basic"
              label="Bonus Question"
              variant="outlined"
              value={question}
              onChange={handleQuestionChange}
            />
            <TextField
              autoComplete="off"
              sx={{ mx: 1, minWidth: 50, maxWidth: 100 }}
              id="outlined-basic"
              label="Points"
              variant="outlined"
              value={points}
              onChange={handlePointChange}
            />
            <FormControl sx={{ minWidth: 175, maxWidth: 200 }}>
              <InputLabel>Question type</InputLabel>
              <Select
                value={questionType}
                label="Question type"
                onChange={handleQuestionTypeChange}
              >
                <MenuItem value="player">Player</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="playerNumber">Player/Number</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {renderQuestionType()}
        </>
      )}
    </FormGroup>
  );
};

export default Bonus;
