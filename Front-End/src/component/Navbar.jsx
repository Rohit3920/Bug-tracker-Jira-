import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const auth = localStorage.getItem('User');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    };

    return (
        <div className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-md fixed top-0 left-0 right-0 z-50">
            <h2 className='text-2xl font-bold text-blue-400 hidden md:block'>Bug Tracker</h2>

            {
                auth ?
                    <ul className='flex space-x-6'>
                        <li><Link to="/project" className="hover:text-gray-300">Projects</Link></li>
                        <li><Link to="/ticket" className="hover:text-gray-300">Tickets</Link></li>
                        <li><Link to="/ticket/addTicket" className="hover:text-gray-300">New Ticket</Link></li>
                        <li><Link to="/" className="hover:text-gray-300">Dashboard</Link></li>
                        <li>
                            <Link to="/login" className="flex items-center">
                                <span className='text-blue-300 font-medium mr-2'>{JSON.parse(auth).email}</span>
                                <small className='text-red-400 cursor-pointer hover:text-red-300' onClick={logout}>
                                    (Logout)
                                </small>
                            </Link>
                        </li>
                    </ul>
                    :
                    <ul className='flex space-x-6'>
                        <li><Link to="/signup" className="hover:text-gray-300">Sign Up</Link></li>
                        <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
                    </ul>
            }
        </div>
    );
};

export default Navbar;