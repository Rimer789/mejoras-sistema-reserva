import React, { useState, useEffect } from 'react';
import AuthUser from './AuthUser';

export default function Comunicado() {
    const { http } = AuthUser();
    const [comunicados, setComunicados] = useState([]);
    const [descripcion, setDescripcion] = useState('');
    const [editId, setEditId] = useState(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editId) {
            // Si editId está definido, estamos editando un comunicado existente
            try {
                const updatedComunicado = {
                    descripcion: descripcion,
                };
                await http.put(`/comunicados/${editId}`, updatedComunicado);
                setEditId(null); // Limpiar el modo de edición
                setDescripcion(''); // Limpiar el campo de descripción
                fetchComunicados(); // Actualizar la lista de comunicados
            } catch (error) {
                console.error('Error al editar el comunicado:', error);
            }
        } else {
            // Si editId no está definido, estamos creando un nuevo comunicado
            const newComunicado = {
                descripcion: descripcion,
            };

            try {
                // Enviar el nuevo comunicado al servidor
                await http.post('/comunicados', newComunicado);
                // Limpiar el campo de descripción después de enviar
                setDescripcion('');
                // Actualizar la lista de comunicados
                fetchComunicados();
            } catch (error) {
                console.error('Error al crear el comunicado:', error);
            }
        }
    };

    const handleEdit = (id, descripcion) => {
        // Establecer el modo de edición y cargar la descripción del comunicado
        setEditId(id);
        setDescripcion(descripcion);
    };

    const handleCancelEdit = () => {
        // Cancelar el modo de edición y limpiar la descripción
        setEditId(null);
        setDescripcion('');
    };

    const handleDelete = async (id) => {
        try {
            // Enviar una solicitud para eliminar el comunicado por ID
            await http.delete(`/comunicados/${id}`);
            // Actualizar la lista de comunicados después de eliminar
            fetchComunicados();
        } catch (error) {
            console.error('Error al eliminar el comunicado:', error);
        }
    };

    return (
        <div>
            <h2>Crear/Editar Comunicado</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>
                {editId ? (
                    <div>
                        <button type="submit">Editar Comunicado</button>
                        <button type="button" onClick={handleCancelEdit}>Cancelar Edición</button>
                    </div>
                ) : (
                    <button type="submit">Crear Comunicado</button>
                )}
            </form>

            <h2>Comunicados</h2>
            <ul>
                {comunicados.map((comunicado) => (
                    <li key={comunicado.id}>
                        {comunicado.descripcion}
                        <button onClick={() => handleEdit(comunicado.id, comunicado.descripcion)}>Editar</button>
                        <button onClick={() => handleDelete(comunicado.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
