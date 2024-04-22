import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

const SentenceRecorder = () => {
    const [inputSentence, setInputSentence] = useState('');
    const [recordedSentences, setRecordedSentences] = useState(() => {
      // Retrieve recorded sentences from localStorage or default to an empty array
      return JSON.parse(localStorage.getItem('recordedSentences')) || [];
    });
  
    useEffect(() => {
      // Save the recorded sentences to localStorage when they change
      localStorage.setItem('recordedSentences', JSON.stringify(recordedSentences));
    }, [recordedSentences]);
  
    const recordSentence = () => {
      if (inputSentence !== '') {
        setRecordedSentences(previousSentences => [...previousSentences, inputSentence]);
        setInputSentence('');
      }
    };
  
    const deleteSentence = (index) => {
      setRecordedSentences(previousSentences => previousSentences.filter((_, i) => i !== index));
    };
  
    return (
      <Box sx={{ margin: 2 }}>
        <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
          Record a Sentence
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            label="Enter a sentence"
            variant="outlined"
            fullWidth
            value={inputSentence}
            onChange={(e) => setInputSentence(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') recordSentence(); }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={recordSentence}>
            Record
          </Button>
        </Box>
        <List sx={{ marginTop: 2 }}>
          {recordedSentences.map((sentence, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => deleteSentence(index)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={sentence} />
            </ListItem>
          ))}
        </List>
      </Box>
    )
}

export default SentenceRecorder;
