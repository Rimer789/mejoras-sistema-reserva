import React, { useState, useEffect } from 'react';
import AuthUser from './AuthUser';
import styles from '../estilos/home.module.css'; 

export default function Comunicado() {
    const { http } = AuthUser();
    const [comunicados, setComunicados] = useState([]);

    useEffect(() => {
        fetchComunicados();
    }, []);

    const fetchComunicados = () => {
        http.get('/comunicados')
            .then((response) => {
                setComunicados(response.data.comunicados);
            })
            .catch((error) => {
                console.error('Error al obtener los comunicados:', error);
            });
    };

    return (
        <>
        <div className={styles.container}>
            <h2 className={styles.heading}>Comunicados</h2>
            <ul className={styles.list}>
                {comunicados.map((comunicado) => (
                    <li key={comunicado.id} className={styles.listItem}>
                        {comunicado.descripcion}
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}
