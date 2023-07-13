import React, { useContext } from "react";                                      //se importa react y el usecontext para poder usar el context que se usa globalmente
import { Link } from "react-router-dom";                                        //se importa para darle direcciones a las paginas
import { ShoppingCart } from "phosphor-react";                                  //se importa el shopping cart ya que desde el header se llama al shopping cart
import "./navbar.css";                                                          //se importa el css
import { ShopContext } from "../context/shop-context";                          //se importa el shop context que contiene funciones utilizadas en todas partes en la aplicacion

export const Navbar = () => {                                                   //se crea la funcion navbar     
    const context = useContext(ShopContext);                                    //le damos las funciones del shop context a la variable context
    
    return (                                                                    //se retorna el navbar                          
        <div className="navbar">                                                {/*se crea el navbar*/}
        { !context.admin ?                                                      /*se hace esta pregunta para saber si el usuario registrado es un admin y saber las opciones que se ofrecen*/
            !context.logged ?                                                   /*es para saber si hay un usuario logeado y por lo tanto al darle click en el carrito, poder redireccionar al login o al carrito */
                <div className="links">                                         {/*si no esta logeado se redirige al shop y al login*/}
                    <Link to="/"> enCARtados </Link>                            {/*redirige a la ruta raiz cuando se le da clic al texto de shop*/} 
                    <Link to="/login">                                          {/*se redirige al login si se le da clic al carrito*/}
                        <ShoppingCart size={37}/>                               {/*se llama al elemento shopping cart*/}
                    </Link> 
                </div>
                :
                <div className="links">                                         {/*en caso de que este logeado se redirige igualmente al shop pero ahora cuando se le da clic al carrito redirecciona hacia el carrito*/}
                    <Link to="/shop"> enCARtados </Link>                        {/*redirige a la ruta raiz cuando se le da clic al texto de shop*/}
                    <Link to="/cart">                                           {/*se redirige al carrito si se le da clic al carrito*/}
                        <ShoppingCart size={37}/>                               {/*se llama al elemento shopping cart*/}
                    </Link>
                </div>
            :
            <div className="links">                                             {/*si el usuario es admin envia hacia el editor del inventario y hacia el editor del perfil del administrador*/}
                    <Link to="/editInventory"> Products </Link>                 {/*redirige a la ruta raiz cuando se le da clic al texto de shop*/}
                    <Link to="/editAdmin"> Admin Profile </Link>                {/*se redirige al carrito si se le da clic al carrito*/}      
                </div>
        }
        </div>
    )
};
