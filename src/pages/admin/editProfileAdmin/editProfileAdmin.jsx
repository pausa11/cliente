import React from "react";                                          //se importa react                    
import { useNavigate } from "react-router-dom";                     //se importa useNavigate             
import axios from 'axios';                                          //se importa axios            
import { useState } from "react";                                   //se importa usestate              

const URIADMIN = 'https://tiendaxd.onrender.com/users/3/' || 'http://localhost:3001/users/3/';                  //aqui se hacen las peticiones para el admin

const EditAdmin = () => {
    const [password, setPassword] = useState('');                   //se guarda la contrasena
    const [adress, setAdress] = useState('');                       //nueva direccion
    const [telephone, setTelephone] = useState('');                 //nuevo telefono
    const [email, setEmail] = useState('');                         //nuevo email
    const navigate = useNavigate();                                 //se usa navigate para redireccionar
    const navigateShop = () => {                                    //se crea la funcion para redireccionar
        navigate(`/editInventory`);                                 //redirecciona a editar el inventario
    }

    const update = async (e) => {                                   //se hace una peticion para actualizar al admin
        e.preventDefault();                                         //se previene el comportamiento por defecto
        await axios.put(URIADMIN, { password: password, adress: adress, telephone: telephone, email: email });  //se hace la peticion
        navigateShop();                                             //se llama a la funcion para redireccionar
    }


    return (                                                        //se retorna el componente                                  
        <div className="register-form">                             {/*este es el formulario que pide la info del admin para poder cambiar su info */}
            <h2>Edit Profile</h2>                                   {/*titulo del formulario */}           
            <form onSubmit={update} action="/auth" method="post">   {/*al momento de enviar el formulario se llama a la funcion update para actualizar el admin */}
                <input 
                value={password}                                    /*se guarda la contrasena */             
                onChange={ (e) => setPassword((e.target.value))}    /*se guarda la contrasena */
                type="password" name="pass" id="pass" placeholder="Password"/>  {/*se pide la contrasena */}
                <input 
                value={adress}                                      /*se guarda la nueva direccion */
                onChange={ (e) => setAdress(e.target.value)}        /*se guarda la nueva direccion */
                type="text" name="pass" id="pass" placeholder="Adress"/>    {/*se pide la nueva direccion */}
                <input 
                value={telephone}                                   /*se guarda el nuevo telefono */
                onChange={ (e) => setTelephone(e.target.value)}     /*se guarda el nuevo telefono */
                type="text" name="pass" id="pass" placeholder="Telephone"/> {/*se pide el nuevo telefono */}
                <input 
                value={email}                                       /*se guarda el nuevo email */                    
                onChange={ (e) => setEmail(e.target.value)}         /*se guarda el nuevo email */
                type="text" name="pass" id="pass" placeholder="Email"/> {/*se pide el nuevo email */}
                <input type="submit" className="btn-login" value="Edit" />  {/*se envia el formulario */}
            </form>
        </div>
    )
}

export default EditAdmin;                                           //se exporta el componente             