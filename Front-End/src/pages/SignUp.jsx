import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const navigate = useNavigate();

        useEffect(() => {
            if (localStorage.getItem("User")) {
                navigate("/");
            }
        }, [navigate]);

    const registerUser = (e) => {
        e.preventDefault();
        console.warn(name, email, password, role);

        axios.post('http://localhost:5000/register', {username : name, email, password, role, timestamps: new Date()})
        .then((response) => {console.log("Response : ", response.data);
            if (response.data.user) {
                    navigate("/login");
                }
        }).catch((error) => {
            console.error("There was an error registering the user!", error);
        });

    }

    return (
        <div className='signup'>
            <form onSubmit={registerUser}>
                <h1>Register User</h1>
                <input className='inputFeild'
                    type='text' placeholder='Enter Your name'
                    value={name} onChange={(e) => setName(e.target.value)}
                />
                <input className='inputFeild'
                    type='email' placeholder='Enter Your Email'
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <input className='inputFeild'
                    type='password' placeholder='Enter Your Password'
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />

                <select className='inputFeild' onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="developer">Developer</option>
                    <option value="tester">Tester</option>
                </select>

                <button className='appButton'>Sign Up</button>
            </form>
            <br />
            <Link to="/login" className="text-blue-500 hover:underline">login</Link>
            <br />
            <Link to="/" className="text-blue-500 hover:underline">Home</Link>
        </div>
    )
}

export default SignUp
