import React, { useState, useEffect } from 'react';
import UserList from './src/components/UserList';
import UserForm from './src/components/UserForm';
import { fetchUsers, deleteUser } from './src/api/userService';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const refreshUsers = async () => {
        try {
            const response = await fetchUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    useEffect(() => {
        refreshUsers();
    }, []);


    return (
        <div className="App">
            <UserForm selectedUser={selectedUser} refreshUsers={refreshUsers} />
            <UserList users={users} onSelectUser={handleSelectUser} onDeleteUser={handleDeleteUser} />
        </div>
    );
}

export default App;
