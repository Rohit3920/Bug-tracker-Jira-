import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("User")) {
            navigate("/");
        }
    }, [navigate]);


    const handleLogin = async (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/login', { email, password })
            .then((response) => {
                console.log("Response : ", response.data);
                if (response.data.user) {
                    localStorage.setItem("User", JSON.stringify(response.data.user));
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                    navigate("/");
                }
            }).catch((error) => {
                console.error("There was an error logging in!", error);
                alert("Invalid credentials, please try again.");
            });

    }


    return (
        <div className='login'>
            <form onSubmit={handleLogin}>
                <h1>Login User</h1>

                <input className='inputFeild' type='email' placeholder='Enter Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input className='inputFeild' type='password' placeholder='Enter Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button className='appButton'>Login</button>
            </form>
            <br />
            <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
            <br />
            <Link to="/" className="text-blue-500 hover:underline">Home</Link>
        </div>
    )
}

export default Login;
