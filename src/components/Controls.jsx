import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Controls = ({
    numSentences,
    onNumChange,
    onRefresh,
    onShowEnglishToggle,
    showEnglish,
  }) => (
    <Box sx={{ display: 'flex', gap: 2, margin: 2 }}>
      <TextField
        label="Number of Sentences"
        type="number"
        value={numSentences}
        onChange={onNumChange}
        InputProps={{ inputProps: { min: 0 } }}
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={onRefresh}>
        Generate Sentences
      </Button>
      <Button variant="outlined" color="secondary" onClick={onShowEnglishToggle}>
        {showEnglish ? "Hide English" : "Show English"}
      </Button>
    </Box>
  );

export default Controls;