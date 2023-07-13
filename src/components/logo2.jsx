import React from 'react';
import Logo from '../images/OIG2.png'
import './logo2.css'


const LogoMenu = () => {
    return(
       <div className='LogoContenedorMenu'>
        <img 
        src={Logo}
        className='Logo'
        alt='Logo'/>
      </div>
    )
}

export default LogoMenu;