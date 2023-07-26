import React, { useState, useEffect } from 'react';
import { useAuthentication } from './AuthUtils';
import { saveUserProfile } from './FirebaseUtils';
import Box from '@mui/material';
import { userExistsInDatabase } from './FirebaseUtils';

import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfileCreation = () => {
  const { user } = useAuthentication();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has a complete profile in Firestore
    const checkProfileCompletion = async () => {
      if (user && user.uid) {
        const userExists = await userExistsInDatabase(user.uid);
        if (userExists) {
          navigate('/'); // Redirect to the login page if the user has a complete profile
        }
      }
    };

    checkProfileCompletion();
  }, [user, navigate]);

  const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkill(event.target.value);
  };

  const handleAddSkill = () => {
    // Add the new skill to the skills state
    if (newSkill.trim() !== '') {
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      setNewSkill(''); // Clear the input field after adding the skill
    }
  };

  const handleSaveProfile = async () => {
    // Save the user profile to Firestore
    if (user && user.uid && user.firstName && user.lastName && user.email) {
      const profileData = {
        firstName: user.firstName,
        lastName: user.lastName,
        skills,
        email: user.email,
      };

      await saveUserProfile(user.uid, profileData);
      navigate('/'); // Redirect to the login page after saving the profile
    }
  };

  return (
    <div>
      <TextField
        label="Skill"
        variant="outlined"
        onChange={handleSkillChange}
        value={newSkill}
      />
      <Button variant="contained" onClick={handleAddSkill}>
        Add Skill
      </Button>
      <Button variant="contained" onClick={handleSaveProfile}>
        Save Profile
      </Button>
    </div>
  );
};

export default ProfileCreation;
