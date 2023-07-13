import React from 'react';
import Logo from '../images/OIG.png'
import './logo.css'


const LogoTienda = () => {
    return(
       <div className='LogoContenedor'>
        <img 
        src={Logo}
        className='Logo'
        alt='Logo'/>
      </div>
    )
}

export default LogoTienda;