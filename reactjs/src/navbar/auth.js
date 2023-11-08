import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Home from '../components/home';
import Dashboard from '../components/dashboard';
import AuthUser from '../components/AuthUser';
import Register from '../components/register';
import Users from '../components/users';
import Admin from '../components/admin';
import Comunicado from '../components/Comunicado';
import styles from './nav.module.css';

function Auth() {
    const [menuActive, setMenuActive] = useState(false);
    const { token, logout, user } = AuthUser();
    const navigate = useNavigate();

    const logoutUser = () => {
        if (token !== undefined) {
            logout();
        }
    };

    const toggleMenu = () => { 
        setMenuActive(!menuActive);
    };

    const handleLinkClick = (path) => {
        setMenuActive(false);
        navigate(path);
    };

    const isUserAuthenticated = !!user;

    return (
        <>
            {isUserAuthenticated && (
                
                    <nav className={`menu ${menuActive ? 'active' : ''}`}>
                    <div className="hamburger-icon" onClick={toggleMenu}>
                        &#9776; 
                    </div>
                        <ul className={styles['dropdown-menu']}>
                            <li onClick={() => handleLinkClick('/')}>
                                <Link to="/">Home</Link>
                            </li>
                            {user && user.rol === 'barbero' && (
                            <li onClick={() => handleLinkClick('/dashboard')}>
                                <Link to="/dashboard">Panel Principal</Link>
                            </li>
                            )}
                            {user && user.rol === 'administrador' && (
                                <li onClick={() => handleLinkClick('/admin')}>
                                    <Link to="/admin">Panel</Link>
                                </li>
                            )}
                            {user && user.rol === 'administrador' && (
                                <li onClick={() => handleLinkClick('/users')}>
                                    <Link to="/users">Barberos</Link>
                                </li>
                            )}
                            {user && user.rol === 'administrador' && (
                                <li onClick={() => handleLinkClick('/register')}>
                                    <Link to="/register">Registrar Barbero</Link>
                                </li>
                            )}
                            {user && user.rol === 'administrador' && (
                                <li onClick={() => handleLinkClick('/comunicado')}>
                                    <Link to="/comunicado">Crear Comunicado</Link>
                                </li>
                            )}
                            <li onClick={logoutUser}>
                                <span role="button">Cerrar Sesión</span>
                            </li>
                        </ul>
                        </nav>
                
            )}

            <div >
                <Routes>
                    <Route path="/" element={<Home />} />
                    {user && (user.rol === 'administrador' || user.rol === 'barbero') && (
                        <Route path="/dashboard" element={<Dashboard />} />
                    )}
                    {user && user.rol === 'administrador' && (
                        <Route path="/admin" element={<Admin />} />
                    )}
                    {user && user.rol === 'administrador' && (
                        <Route path="/register" element={<Register />} />
                    )}
                    {user && user.rol === 'administrador' && (
                        <Route path="/users" element={<Users />} />
                    )}
                    {user && user.rol === 'administrador' && (
                        <Route path="/comunicado" element={<Comunicado />} />
                    )}
                </Routes>
            </div>
        </>
    );
}

export default Auth;
