//React
import React, { useState } from "react";

//json files
import japSentences from "../src/japSentences.json";
import frenchSentences from "../src/frenchSentences.json";

//components
import SentenceDisplay from "../src/components/SentenceDisplay.jsx";
import Controls from "../src/components/Controls.jsx";
import SentenceRecorder from "../src/components/SentenceRecord.jsx";
import ContactForm from "../src/components/ContactForm.jsx";

//MUI
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";
import {
  Container,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

function App() {
  const [currentSentences, setCurrentSentences] = useState([]);
  const [showEnglish, setShowEnglish] = useState(true);
  const [numSentences, setNumSentences] = useState(1);
  const [language, setLanguage] = useState("Japanese");

  const languages = [
    { label: "Japanese", sentences: japSentences },
    { label: "French", sentences: frenchSentences },
  ];

  const handleRefresh = () => {
    const selectedLanguage = languages.find((l) => l.label === language);
    const selectedSentences = [];
    for (let i = 0; i < numSentences; i++) {
      const randomIndex = Math.floor(
        Math.random() * selectedLanguage.sentences.length
      );
      selectedSentences.push(selectedLanguage.sentences[randomIndex]);
    }
    setCurrentSentences(selectedSentences);
  };

  const toggleEnglish = () => {
    setShowEnglish(!showEnglish);
  };

  const handleNumChange = (event) => {
    setNumSentences(parseInt(event.target.value));
  };

  const handleLanguageChange = (event, newValue) => {
    setLanguage(newValue.label);
  };

  return (
    <>
      {/* navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gengo GURU
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Features</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar>

      {/* Controls */}
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
          Language Learning Tool
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                Language Selector
              </Typography>

              <Autocomplete
                disablePortal
                id="language-selector"
                options={languages}
                getOptionLabel={(option) => option.label}
                sx={{ width: 300 }}
                onChange={handleLanguageChange}
                renderInput={(params) => (
                  <TextField {...params} label="Select Language" />
                )}
                disableClearable
              />

              <Controls
                numSentences={numSentences}
                onNumChange={handleNumChange}
                onRefresh={handleRefresh}
                onShowEnglishToggle={toggleEnglish}
                showEnglish={showEnglish}
              />
            </Paper>
          </Grid>

          {currentSentences.map((sentence, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper elevation={2} sx={{ padding: 1, bgcolor: "#e3f2fd" }}>
                {" "}
                {/* Light blue */}
                <SentenceDisplay
                  sentence={sentence}
                  showEnglish={showEnglish}
                  language={language}
                />
              </Paper>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <SentenceRecorder />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
              <ContactForm />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
