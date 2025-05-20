//Show content  Welcome to NC-News! 
// This is a news website where you can find the latest articles on 
// various topics. You can also vote on articles and leave comments. Enjoy your stay!
//You are logged in as Amy Happy
import React from 'react';
import { Typography, Container } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Welcome to NC-News!
      </Typography>
      <Typography variant="h5" gutterBottom>
        This is a news website where you can find the latest articles on various topics. You can also vote on articles and leave comments. Enjoy your stay!
      </Typography>
      <Typography variant="h6" gutterBottom>
        You are logged in as Amy Happy
      </Typography>
    </Container>
  );
}
export default Home;