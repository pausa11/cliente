import React from "react";                                      //se importa react                                        
import './login.css'                                            //se importa el css
import { useNavigate } from "react-router-dom";                 //es para redireccionar
import axios from "axios";                                      //es para poder hacer peticiones    
import { useState, useEffect } from "react";                    //se importa usestate y useeffect             
import { ShopContext } from "../../context/shop-context";       //se importa el contexto para poder usarlo
import { useContext } from "react";                             //se importa usecontext para poder usar el contexto  
import LogoTienda from '../../components/logo.jsx'             

const URI = 'https://tiendaxd.onrender.com/users/' || 'http://localhost:3001/users/';                     //ruta para hacer las peticiones 



const Login = () => {                                           //se crea el componente                        
    const context = useContext(ShopContext);                    //se crea la variable para usar el contexto         
    const navigate = useNavigate();                             //se crea la variable para poder redireccionar
    const navigateRegister = () => {                            //redirige hacia el registro
        navigate(`/register`);                                  //se navega hacia la pagina de registro
    }

    const navigateLogin = () => {                               //redirige al login
        navigate(`/login`);                                     //se navega hacia la pagina de login
    }

    const navigateShopAddtoCart = () => {                       //redirige a la pagina principal
        navigate(`/shop`);                                      //se navega hacia la pagina principal         
    }

    const navigateEditInventory = () => {                       //redirige hacia el editor del inventario
        navigate(`/editInventory`);                             //se navega hacia la pagina del editor del inventario       
    }

    const [entrada, SetEntrada] = useState('');                 //este hook representa la entrada del usuario 
    const [entradaP, SetEntradaP] = useState('');               //este es el hook para el password 
    const [users, setUsers] = useState([]);                     //aqui se almacenan los usuarios para comparar con la entrada
    
    useEffect(() => {                                           //se usa el useeffect para que se ejecute la funcion getUsers al cargar la pagina
        getUsers();                                             //se llama la funcion getUsers                      
    }, [])                                                      //se le pasa un arreglo vacio para que solo se ejecute una vez

    const getUsers = async() => {                               //aqui se soolicitan los usurios
        const res = await axios.get(URI)                        //se hace la peticion get a la ruta de los usuarios         
        console.log(res.data);                                  //se muestran los datos de los usuarios               
        setUsers(res.data)                                      //se almacenan los datos de los usuarios en el hook users
    }



    const compare = () => {                                     //funcion para comparar si la entrada del usurio es igual a un usuario ya existente y poder logearse
            if (users.find(e => e.user_name === entrada && e.password === entradaP))    //se compara si la entrada del usuario es igual a un usuario ya existente
                return true;                                    //si es asi retorna true                
            else                                                //de lo contrario                       
                return false;                                   //retorna false        
    }

    return (                                                    //se retorna el html
        <div className="login-form">                            {/*se crea el formulario de login */}      
            <LogoTienda/>                                       {/*se llama el logo de la tienda */} 
            <h2>Login</h2>
            <form onSubmit={compare()}>                         {/*al enviar el formulario se llama la funcion compare */}
                <input 
                    value={entrada}                             //{/*se ingresa dentro de entrada el valor del input */}
                    onChange={(e) => SetEntrada(e.target.value)}    //se cambia el valor de entrada por el valor del input
                    type="text" name="user" id="user" placeholder="User" /> {/*se crea el input para el usuario */}
                <input 
                    value={entradaP}                            //se ingresa dentro de entradap el valor del input de la contraseña
                    onChange={(e) => SetEntradaP((e.target.value))}     //se cambia el valor de entradap por el valor del input
                    type="password" name="pass" id="pass" placeholder="Password" /> {/*se crea el input para la contraseña */}
                <input type="submit" className="btn-login" value="Login" onClick={(e) => { //al darle click al si compare es true osea que el login tuvo exito
                    e.preventDefault();                         //se previene el comportamiento por defecto del formulario
                    if(compare())                               //preguntasi la comparacion tuvo exito
                    {
                        if (entrada === 'admin')                //si el nombre de la entrada 
                        {
                            navigateEditInventory();            //rediricciona al editor del inventario 
                            context.AdminChanger(true);         //se activa el admin dentro del context
                        }
                        else 
                            navigateShopAddtoCart();            //de lo contrario es un usuario normal por lo que envia al shop con los botones
                        context.loggedChanger(true);            //se cabia a true el hook que pone si esta logeado el usuario
                    }
                    else
                         navigateLogin() }}/>                   {/*si la comparacion no tuvo exito se redirige al login */}         
            </form>
            <div href="register" className="btn-register" onClick={navigateRegister}>register</div> {/*se lleva al registro si se le da click */}
        </div>
    )
}

export default Login;                                           //se exporta el componente                 