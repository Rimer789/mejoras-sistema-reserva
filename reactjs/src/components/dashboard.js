import React, { useEffect, useState } from 'react';
import AuthUser from './AuthUser';

export default function Dashboard() {
    const { http } = AuthUser();
    const [userdetail, setUserdetail] = useState('');
    const [reservas, setReservas] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        fetchUserDetail();
        fetchReservas();
    }, [selectedDate]);

    const fetchUserDetail = () => {
        http.post('/me').then((res) => {
            setUserdetail(res.data);
        });
    }

    const fetchReservas = () => {
        
        http.get(`/reservas?fecha=${selectedDate}`).then((res) => {
            setReservas(res.data.reservas);
        });
    }

    const reservasFiltradas = reservas.filter(reserva => reserva.barbero === userdetail.name);

    function renderElement() {
        if (userdetail) {
            return (
                <div>
                    <h4>Name</h4>
                    <p>{userdetail.name}</p>
                    <h4>Email</h4>
                    <p>{userdetail.email}</p>
                    <h4>Tipo de usuario</h4>
                    <p>{userdetail.rol}</p>
                    <div>
                        <h2>Reservas</h2>
                        <div>
                            <h4>Seleccione una fecha:</h4>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                        <ul>
                            {reservasFiltradas.map(reserva => (
                                <li key={reserva.id}>
                                    Nombre: {reserva.nombre}<br />
                                    Fecha y Hora: {reserva.fecha_hora}<br />
                                    Barbero: {reserva.barbero}<br/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        } else {
            return <p>cargando</p>;
        }
    }

    return (
        <div>
            <h1 >panel principal</h1>
            {renderElement()}
        </div>
    );
}
