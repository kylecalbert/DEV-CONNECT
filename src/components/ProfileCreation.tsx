// ProfileCreation.tsx
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
          navigate('/'); // Redirect to login page if the user has a complete profile
        }
      }
    };

    checkProfileCompletion();
  }, [user, navigate]);

  const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkill(event.target.value);
  };

  const handleSaveProfile = async () => {
    // Save the skills to the user's profile in Firestore
    if (user && user.uid) {
      await saveUserProfile(user.uid, { skills });
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
      <Button variant="contained" onClick={handleSaveProfile}>
        Save Profile
      </Button>
    </div>
  );
};

export default ProfileCreation;
