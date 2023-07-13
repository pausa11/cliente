import React from "react";                                      //importa react               

export const Product = (props) => {
    const { nombre, precio, descripcion, img1, img2, img3 } = props.data; //se le da valor a las variables en funcion de lo que se saca de la base de datos
    return (
        <div className="product">                               {/*aqui se muestran las informaciones de los productos en la pagina principal */}
            <div className="slide-var">                         {/*aqui se muestran las imagenes de los productos en la pagina principal */}      
                <ul>    
                    <li><img src={img1} alt={nombre}/></li>     {/*este es el carrusel para las imagenes */}
                    <li><img src={img2} alt={nombre}/></li>     {/*este es el carrusel para las imagenes */}
                    <li><img src={img3} alt={nombre}/></li>     {/*este es el carrusel para las imagenes */}
                </ul>
            </div>
            <div className="descripcion">                       {/*aqui se muestran las descripciones de los productos en la pagina principal */}
                <p>{descripcion}</p>                            {/*aqui se muestran las descripciones de los productos en la pagina principal */}
            </div>
            <div className="description">                       {/*aqui se muestran las descripciones de los productos en la pagina principal */}
                <p> 
                    <b>{nombre}</b>                             {/*aqui se muestran los nombres de los productos en la pagina principal */}
                </p>
                <p> ${precio}</p>                               {/*aqui se muestran los precios de los productos en la pagina principal */}
            </div>
        </div> 
    );
};