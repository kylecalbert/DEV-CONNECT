import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from './FirebaseUtils';

// Define the shape of a user object
interface User {
  uid: string;
  displayName: string;
  email: string;
  lastName: string;
  firstName: string;
  availability: string[];
  skills: string[];
}

const UserListPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch all users when the component mounts
    const fetchUsers = async () => {
      try {
        const allUsers = await fetchAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.uid}>
            <h3>{user.displayName}</h3>
            <p>Email: {user.email}</p>
            <p> Name: {user.firstName}</p>
            <p>Availability: {user.availability.join(', ')}</p>
            <p>Skills: {user.skills.join(',')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListPage;
