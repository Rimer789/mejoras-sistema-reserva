import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthUser from './AuthUser';

export default function Home() {
    const [users, setUsers] = useState([]);
    const { http, setToken } = AuthUser();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        http.get('/users')
            .then(response => {
                const barberUsers = response.data.users.filter(user => user.rol === 'barbero');
                setUsers(barberUsers);
            })
            .catch(error => {
                console.error('Error al obtener la lista de usuarios:', error);
            });
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            http.delete(`/users/${userId}`)
                .then(response => {
                    console.log('Usuario eliminado con éxito:', response.data);
                    loadUsers(); 
                })
                .catch(error => {
                    console.error('Error al eliminar el usuario:', error);
                });
        }
    };

    return (
        <div>
            <h1>Lista de Barberos</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
