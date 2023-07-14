import React from "react";                                      //importa react             
import './register.css';                                        //importa el css de la pagina
import { useNavigate } from "react-router-dom";                 //importa useNavigate para poder navegar entre paginas       
import axios from 'axios';                                      //importa axios para poder hacer peticiones
import { useState, useEffect } from "react";                    //importa usestate y useeffect para poder usarlos

const URI = 'https://tiendaxd.onrender.com/users/' || 'http://localhost:3001/users/';                     //direccion en la que se hacen peticiones 

const Register = () => {
    const [name, setName] = useState('');                       //todo esto son valores que se registran en la base de datos
    const [password, setPassword] = useState('');               //se crean los hooks para cada valor
    const [adress, setAdress] = useState('');                   //se crean los hooks para cada valor
    const [telephone, setTelephone] = useState('');             //se crean los hooks para cada valor
    const [email, setEmail] = useState('');                     //se crean los hooks para cada valor
    const [users, setUsers] = useState([]);                     //se crea el hook para almacenar los usuarios
    const navigate = useNavigate();                             //se crea la variable para poder navegar entre paginas
    const navigateLogin = () => {                               //redirige al login
        navigate(`/login`);                                     //envia al login
    }

    const navigateRegister = () => {                            //redirige al registro          
        navigate(`/register`);                                  //envia al resgiter
    }

    useEffect(() => {                                           //se ejecuta al cargar la pagina                   
        getUsers();                                             //se llama a la funcion getusers
    }, [])                                                      //se ejecuta solo al cargar la pagina                     

    const getUsers = async() => {                               //se obtienen todos los usuarios
        const res = await axios.get(URI)                        //se hace una peticion get a la direccion URI       
        setUsers(res.data)                                      //se almacenan los usuarios en el hook users
    }

    const store = async (e) => {                                //hace un metodo post para ingresar el usuario a la base de taods
        e.preventDefault();                                     //evita que se recargue la pagina          
        await axios.post(URI, {user_name: name, password: password, adress: adress, telephone: telephone, email: email });  //se hace una peticion post a la direccion URI
        navigateLogin();                                        //envia al login                    
    }

    return (                                                    //retorna el formulario de registro             
        <div className="register-form">                         {/*se crea el formulario de registro*/}      
            <h2>register</h2>
            <form onSubmit={store} action="/auth" method="post"> {/*se llama a store en el momento de enviar el formulario */}
                <input 
                value={name}                                    //se obtiene el valor del input         
                onChange={ (e) => users.find(event => event.username === e.target.value) ? navigateRegister() : setName(e.target.value)}
                type="text" name="user" id="user" placeholder="user"/>  {/*se crea el input para el usuario */}
                <input 
                value={password}                                //se obtiene el valor del input
                onChange={ (e) => setPassword((e.target.value))}    //se obtiene el valor del input
                type="password" name="pass" id="pass" placeholder="password"/>  {/*se crea el input para la contraseña */}
                <input 
                value={adress}                                  //se obtiene el valor del input               
                onChange={ (e) => setAdress(e.target.value)}    //se obtiene el valor del input 
                type="text" name="pass" id="pass" placeholder="adress"/>    {/*se crea el input para la direccion */}
                <input 
                value={telephone}                               //se obtiene el valor del input        
                onChange={ (e) => setTelephone(e.target.value)} //se obtiene el valor del input
                type="text" name="pass" id="pass" placeholder="telephone"/> {/*se crea el input para el telefono */}
                <input 
                value={email}                                   //se obtiene el valor del input    
                onChange={ (e) => setEmail(e.target.value)}     //se obtiene el valor del input
                type="text" name="pass" id="pass" placeholder="email"/> {/*se crea el input para el correo */}
                <input type="submit" className="btn-login" value="register" />  {/*se crea el boton para enviar el formulario */}
            </form>
        </div>
    )
}

export default Register;                                        //exporta la pagina de registro                    