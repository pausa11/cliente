import React from "react";                                          //se importa react
import { useState } from "react";                                   //se importa usestate              
import axios from 'axios';                                          //se importa axios

const URI = 'https://tiendaxd.onrender.com/products/' || 'http://localhost:3001/products/';                      //aqui se hacen las peticiones 

export const Product = (props) => {
    const { id, nombre, precio, img1, img2, img3, stockMax, stockMin } = props.data; //aqui se guardan los datos de los productso
    const [priceHook, setPrice] = useState('');                     //hook para el precio del producto
    const [maxStock, setMaxS] = useState('');                       //hook para el stock maximo
    const [minStock, setMinS] = useState('');                       //hook para el stock minimo
    

    const update = async (e) => {                                   //funcion para actualizar un producto a partir del id 
        e.preventDefault();                                         //se previene el comportamiento por defecto del formulario           
        await axios.put(URI+id+'/', { precio: priceHook, stockMax: maxStock, stockMin: minStock }); //se hace la peticion put para actualizar el producto
    }

    return (                                                        //se retorna el componente                      
        <div className="product">                                   {/*se crea el componente contenedor de clase product*/}                
            <div className="slide-var">                             {/*se crea el componente de clase slide-var*/}
                <ul>
                    <li><img src={img1} alt={nombre}/></li>         {/*carrousel de las imagenes */}
                    <li><img src={img2} alt={nombre}/></li>         
                    <li><img src={img3} alt={nombre}/></li>
                </ul>
            </div>
            <div className="description">                           {/*se crea el componente de clase description*/}           
                <p> 
                    <b>{nombre}</b>                                 {/*se muestra toda la informacion de los productos */}
                </p>
                <p> ${precio}</p>                                   {/*se muestra toda la informacion de los productos */}
                <p> Max Stock: {stockMax}</p>
                <p> Min Stock: {stockMin}</p>
                <form onSubmit={update} action="/auth" method="post">{/*al momento de enviar el formulario se llama a la funcion update para actualizar el producto */}
                    <input 
                    onChange={ (e) => setPrice(e.target.value)}     /* se guarda el valor ingresado del input dentro de price */
                    type="text" name="pass" id="pass" placeholder="New Prize"/> {/*se crea un input para ingresar el nuevo precio */}
                    <input 
                    onChange={ (e) => setMaxS(e.target.value)}      /*se ingresa el valor ingresado del input dentro de maxstock */
                    type="text" name="pass" id="pass" placeholder="New MaxStock"/>  {/*se crea un input para ingresar el nuevo stock maximo */}
                    <input 
                    onChange={ (e) => setMinS(e.target.value)}      /*se ingresa el valor ingresado del input dentro de setMins*/
                    type="text" name="pass" id="pass" placeholder="New MinStock"/>  {/*se crea un input para ingresar el nuevo stock minimo */}
                    <input type="submit" className="btn-login" value="Edit" /> {/*boton para mandar el formulario */}
                </form>
            </div>
        </div> 
    );
};