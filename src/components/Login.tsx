// Login.js
import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import GoogleButton from 'react-google-button';
import { useAuthentication } from './AuthUtils';
import { useNavigate } from 'react-router-dom';
import { userExistsInDatabase } from './FirebaseUtils';

function Login() {
  const { user, handleGoogleSignIn, handleGoogleSignOut } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    if (user?.uid) {
      // Use optional chaining to access user.uid
      // Check if the user has a complete profile in Firestore
      const checkUserAndRedirect = async () => {
        const userExists = await userExistsInDatabase(user.uid ?? ''); // Use nullish coalescing to provide an empty string as default
        if (!userExists) {
          navigate('/profileCreation'); // Navigate to the profile creation page
        }
      };
      checkUserAndRedirect();
    }
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

      {user?.displayName ? (
        <Button variant="contained" onClick={handleGoogleSignOut}>
          Log Out
        </Button>
      ) : (
        <GoogleButton onClick={handleGoogleSignIn} />
      )}
    </Box>
  );
}

export default Login;
