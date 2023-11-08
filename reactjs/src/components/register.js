import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';

export default function Register() {
    const navigate = useNavigate();
    const {http,setToken} = AuthUser();
    const [name,setName] = useState();
    const [rol, setRol] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const submitForm = () =>{
        
        http.post('/register',{email:email,password:password,name:name,rol:rol}).then((res)=>{
           
        })
    }

    return(
        <div >
            <div >
                <div >
                    <h1 >Registrar nuevo barbero</h1>
                    <div > 
                        <label>Nombre:</label>
                        <input type="test"  placeholder="Enter name"
                            onChange={e=>setName(e.target.value)}
                        id="name" />
                    </div>
                    <div >
                        <label>Correo:</label>
                        <input type="email"  placeholder="Enter email"
                            onChange={e=>setEmail(e.target.value)}
                        id="email" />
                    </div>

                    <div >
                        <label>Contrasena:</label>
                        <input type="password"  placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                        id="pwd" />
                    </div>

                    <div >
                    <label>rol</label>
                    <input type='text'  placeholder="tipo de usuario"
                        onChange={e=> setRol(e.target.value)}
                        id='rol'/>
                    </div>
                    <button type="button" onClick={submitForm} >Registrar</button>
                </div>
            </div>
        </div>
    )
}