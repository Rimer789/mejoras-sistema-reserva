import React, { useEffect, useState } from 'react';
import AuthUser from './AuthUser';

export default function Admin() {
    const { http } = AuthUser();
    const [userdetail, setUserdetail] = useState('');
    useEffect(() => {
        fetchUserDetail();
    }, []);

    const fetchUserDetail = () => {
        http.post('/me').then((res) => {
            setUserdetail(res.data);
        });
    }

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
                    
                </div>
            );
        } else {
            return <p>cargando</p>;
        }
    }

    return (
        <>
            <h1 className='mb-4 mt-4'>panel principal</h1>
            {renderElement()}
        </>
    );
}
