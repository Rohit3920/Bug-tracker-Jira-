import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            try {
                const user = localStorage.getItem('User');
                if (user) {
                    setIsAuthenticated(true);
                    setUserEmail(JSON.parse(user).email);
                } else {
                    setIsAuthenticated(false);
                    setUserEmail('');
                }
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
                setIsAuthenticated(false);
                setUserEmail('');
            }
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const logout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setUserEmail('');
        navigate('/signup');
    };

    const linkClasses = "hover:text-gray-300 transition duration-200 ease-in-out";

    return (
        <div className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-md fixed top-0 left-0 right-0 z-50">
            <h2 className='text-2xl font-bold text-blue-400 hidden md:block'>Bug Tracker</h2>

            {isAuthenticated ? (
                <ul className='flex space-x-6 items-center'>
                    <li><Link to="/project" className={linkClasses}>Projects</Link></li>
                    <li><Link to="/ticket" className={linkClasses}>Tickets</Link></li>
                    <li><Link to="/ticket/addTicket" className={linkClasses}>New Ticket</Link></li>
                    <li><Link to="/" className={linkClasses}>Dashboard</Link></li>
                    <li>
                        <div className="flex items-center">
                            <span className='text-blue-300 font-medium mr-2'>{userEmail}</span>
                            <small
                                className='text-red-400 cursor-pointer hover:text-red-300 transition duration-200 ease-in-out'
                                onClick={logout}
                            >
                                (Logout)
                            </small>
                        </div>
                    </li>
                </ul>
            ) : (
                <ul className='flex space-x-6'>
                    <li><Link to="/signup" className={linkClasses}>Sign Up</Link></li>
                    <li><Link to="/login" className={linkClasses}>Login</Link></li>
                </ul>
            )}
        </div>
    );
};

export default Navbar;