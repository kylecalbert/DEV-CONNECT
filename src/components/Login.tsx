// Login.js
import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import GoogleButton from 'react-google-button';
import { useAuthentication } from './AuthUtils';
import { userExistsInDatabase } from './FirebaseUtils'; // Import the function to check user existence
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
  const { user, handleGoogleSignIn, handleGoogleSignOut } = useAuthentication();
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    // Check if the user is logged in and whether their userID is not in the database
    const checkUserAndRedirect = async () => {
      if (user && user.uid && !(await userExistsInDatabase(user.uid))) {
        navigate('/profileCreation'); // Navigate to the profile creation page
      }
    };

    checkUserAndRedirect(); // Call the function when the component mounts
  }, [user, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        padding: '20px',
        background: '#f5f5f5',
      }}
    >
      <Typography variant="h5" component="h1" sx={{ marginBottom: '40px' }}>
        Welcome to ANDI-CONNECT
      </Typography>

      {user?.displayName ? ( //if the user exists ie if user is signed in, then render log out button
        <Button variant="contained" onClick={handleGoogleSignOut}>
          Log Out
        </Button>
      ) : (
        ///else if there is no user,  the sign in with google button
        <GoogleButton onClick={handleGoogleSignIn} />
      )}
    </Box>
  );
}

export default Login;
