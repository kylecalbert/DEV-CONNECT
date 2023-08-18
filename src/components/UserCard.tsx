import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface User {
  uid: string;
  displayName: string;
  email: string;
  lastName: string;
  firstName: string;
  availability: string[];
  skills: string[];
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{user.displayName}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Name: {user.firstName}</Typography>
        <Typography>Availability: {user.availability.join(', ')}</Typography>
        <Typography>Skills: {user.skills.join(',')}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
