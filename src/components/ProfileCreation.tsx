import React, { useState, useEffect } from 'react';
import { useAuthentication } from './AuthUtils';
import { saveUserProfile } from './FirebaseUtils';
import { Box, Typography, Chip } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfileCreation = () => {
  const navigate = useNavigate();
  const { user } = useAuthentication();

  const [newSkill, setNewSkill] = useState<string>('');
  const [skills, setSkills] = useState<string[]>([]);

  ////will have an input field for user to enter their skill
  ///after the user adds their skill, they will then be able to see under the input field
  ///the user should be able to delete the skill
  //users can enter 4 skills, after that they should be able to save their profile

  const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkill(event.target.value);
  };
  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && skills.length < 4) {
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      setNewSkill('');
    }
  };
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSaveProfile = async () => {
    if (user && user.uid && user.firstName && user.lastName && user.email) {
      const profileData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        skills,
      };

      await saveUserProfile(user.uid, profileData);
      navigate('/Availiability');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '16px' }}>
        Add Your Skills
      </Typography>
      <TextField
        label="Skill"
        variant="outlined"
        value={newSkill}
        onChange={handleSkillChange}
        sx={{ marginBottom: '16px' }}
      />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginBottom: '16px',
        }}
      >
        {skills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            onDelete={() => handleRemoveSkill(skill)}
            color="secondary"
            sx={{
              margin: '4px',
              backgroundColor: '#E0E0E0',
              color: '#333',
              '&:hover': {
                backgroundColor: '#BDBDBD',
              },
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          marginBottom: '16px', // Added spacing between the text field and buttons
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          onClick={handleAddSkill}
          sx={{
            marginBottom: '8px',
            backgroundColor: '#4caf50',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#45a049',
            },
          }}
        >
          Add Skill
        </Button>
        <Button
          variant="contained"
          onClick={handleSaveProfile}
          sx={{
            backgroundColor: '#f44336',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#d32f2f',
            },
          }}
        >
          Create Profile
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileCreation;
