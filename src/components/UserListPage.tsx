import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from './FirebaseUtils';
import UserCard from './UserCard';

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
      <div style={{ maxHeight: '500px', overflowY: 'scroll' }}>
        {users.map((user) => (
          <UserCard key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserListPage;
