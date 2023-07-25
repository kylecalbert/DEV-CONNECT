// ProfileCreation.tsx
import React from 'react';
import { useAuthentication } from './AuthUtils';

const ProfileCreation = () => {
  const { user } = useAuthentication();

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          {user.firstName && <p>First Name: {user.firstName}</p>}
          {user.lastName && <p>Last Name: {user.lastName}</p>}
          {/* Here, you can add the form to create a profile */}
        </div>
      ) : (
        <div>Please sign in to create a profile.</div>
      )}
    </div>
  );
};

export default ProfileCreation;
