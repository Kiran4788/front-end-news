//Show content  Welcome to NC-News! 
// This is a news website where you can find the latest articles on 
// various topics. You can also vote on articles and leave comments. Enjoy your stay!
//You are logged in as Amy Happy
import React from 'react';
import { Typography, Container } from '@mui/material';
import LoginForm from './LoginForm';
import { AccountContext } from "../context/Account";
import { useContext } from 'react';
const Home = () => {
  const { loggedInUser } = useContext(AccountContext);
  if (!loggedInUser) {
    return (
      <Container>
        <Typography variant="h2" gutterBottom>
          Welcome to NC-News!
        </Typography>
        <Typography variant="h5" gutterBottom>
          Please log in to access the latest articles and features.
        </Typography>
        <LoginForm />
      </Container>
    );
  }
  else {
    return (
      <Container>
        <Typography variant="h2" gutterBottom>
          Welcome to NC-News!
        </Typography>
        <Typography variant="h5" gutterBottom>
          You are logged in as {loggedInUser}
        </Typography>
        <Typography variant="h5" gutterBottom>
          This is a news website where you can find the latest articles on various topics.
          You can also vote on articles and leave comments. Enjoy your stay!
        </Typography>
      </Container>
    );
  }
}
export default Home;