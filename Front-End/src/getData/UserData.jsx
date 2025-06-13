import { useState } from 'react'
import axios from 'axios'

export function UserData() {
    const [users, setUsers] = useState([]);

    try {
        axios.get('http://localhost:5000/user')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    } catch (error) {
        console.error('Error fetching user data:', error);
    }

    return users;
}

export function UserDataById(id) {
    const [user, setUser] = useState(null);

    try {
        axios.get(`http://localhost:5000/user/${id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data by ID:', error);
            });
    } catch (error) {
        console.error('Error fetching user data by ID:', error);
    }

    return user ? user.title : "Unknown User";
}



