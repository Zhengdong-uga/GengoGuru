import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const SentenceDisplay = ({ sentence, showEnglish, language }) => {
  // Determine which language to display
  const displaySentence = language === "Japanese" ? sentence.kanji : sentence.french;
  const displayEnglish = sentence.english;

  return (
    <Card sx={{ margin: 1, maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {displaySentence}
        </Typography>
        {showEnglish && (
          <Typography variant="body2" color="text.secondary">
            {displayEnglish}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default SentenceDisplay;
