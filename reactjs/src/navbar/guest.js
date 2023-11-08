import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Home from '../components/home';
import Login from '../components/login';
import Reserva from '../components/reserva'
import './cs.css';

const Menu = () => {
    const [menuActive, setMenuActive] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => { 
        setMenuActive(!menuActive);
    };
    const handleLinkClick = (path) => {
        setMenuActive(false);
        navigate(path);
    };

    return (
        <>
            <div>
                <nav className={`menu ${menuActive ? 'active' : ''}`}>
                    <div className="hamburger-icon" onClick={toggleMenu}>
                        &#9776; 
                    </div>
                    <ul  >
                        <li onClick={() => handleLinkClick('/')} >
                            <Link to="/">Home</Link>
                        </li>
                        <li onClick={() => handleLinkClick('/login')}>
                            <Link to="/login">Login</Link>
                        </li>

                        <li onClick={() => handleLinkClick('/reserva')} >
                            <Link to="/reserva">reserva</Link>
                        </li>

                    </ul>
                </nav>
            </div>
            <div> <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route path='/reserva' element={<Reserva />} />
            </Routes></div>
        </>
    );
};

export default Menu;

