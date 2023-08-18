// Login.js
import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import GoogleButton from 'react-google-button';
import { useAuthentication } from './AuthUtils';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { user, handleGoogleSignIn, handleGoogleSignOut } = useAuthentication();
  const navigate = useNavigate();

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
