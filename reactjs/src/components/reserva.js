import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthUser from './AuthUser';

export default function Home() {
    const [users, setUsers] = useState([]);
    const { http, setToken } = AuthUser();
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState(''); 
    const [hora, setHora] = useState('08:00'); 
    const [barbero, setBarbero] = useState('');
    const [error, setError] = useState('');
    
    useEffect(() => {
        http.get('/users')
            .then(response => {
                const barberUsers = response.data.users.filter(user => user.rol === 'barbero');
                setUsers(barberUsers);
            })
            .catch(error => {
                console.error('Error al obtener la lista de usuarios:', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const currentDate = new Date();
        const selectedDate = new Date(`${fecha}T${hora}`);
        
        if (selectedDate < currentDate) {
            setError('No puedes reservar en fechas u horas pasadas.');
            return;
        }

        const newReserva = {
            nombre: nombre,
            fecha_hora: `${fecha} ${hora}`,
            barbero: barbero,
        };
    
        try {
            await http.post(`/reservas`, newReserva);
            setNombre('');
            setFecha('');
            setHora('08:00');
            setBarbero('');
            setError('');
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            alert('Ya existe una reserva para esta hora y este barbero.');
        }
    };

    const generateTimeOptions = () => {
        const options = [];
        let time = new Date();
        time.setHours(8, 0, 0, 0);
        const endTime = new Date();
        endTime.setHours(20, 0, 0, 0);

        while (time <= endTime) {
            const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            options.push(
                <option key={formattedTime} value={formattedTime}>
                    {formattedTime}
                </option>
            );
            time.setMinutes(time.getMinutes() + 30);
        }

        return options;
    };

    return (
        <div>
            <h2>Reserva tu corte</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Fecha:</label>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                        min={new Date().toISOString().split('T')[0]} 
                    />
                </div>
                <div>
                    <label>Hora:</label>
                    <select
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required
                    >
                        {generateTimeOptions()}
                    </select>
                </div>
                <div>
                    <label>Barbero:</label>
                    <select
                        value={barbero}
                        onChange={(e) => setBarbero(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un barbero</option>
                        {users.map(user => (
                            <option key={user.id} value={user.name}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Crear Reserva</button>
            </form>
        </div>
    );
}
