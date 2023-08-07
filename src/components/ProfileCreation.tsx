import React, { useState, useEffect } from 'react';
import { useAuthentication } from './AuthUtils';
import { saveUserProfile } from './FirebaseUtils';
import { Box } from '@mui/material';
import { userExistsInDatabase } from './FirebaseUtils';
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

  useEffect(() => {
    // Check if the user has a complete profile in Firestore
    const checkProfileCompletion = async () => {
      if (user && user.uid) {
        const userExists = await userExistsInDatabase(user.uid);
        if (userExists) {
          navigate('/Availiability'); // Redirect to the login page if the user has a complete profile
        }
      }
    };

    checkProfileCompletion();
  }, [user, navigate]);

  const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkill(event.target.value);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && skills.length < 4) {
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      setNewSkill('');
    }
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
      navigate('/');
    }
  };

  return (
    <div>
      <TextField
        label="Skill"
        variant="outlined"
        value={newSkill}
        onChange={handleSkillChange}
      />

      <Box>
        <Button variant="contained" onClick={handleAddSkill}>
          Add Skill
        </Button>
      </Box>

      <Box>
        <Button variant="contained" onClick={handleSaveProfile}>
          Create Profile
        </Button>
      </Box>
    </div>
  );
};

export default ProfileCreation;
