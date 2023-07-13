import React from 'react';
import {Elements} from "@stripe/react-stripe-js";                       //se llama elements para stripe
import { loadStripe } from '@stripe/stripe-js';                         //se llama loadstripe
import PaymentForm from './PaymentForm';                                //se llama al formulario de pago        

const PUBLIC_KEY="pk_test_51NS6EDDJIqV1atJZOCfbis4XJqLCdZiCe3SB6jUWvAWwDqTdDRFBkJmptDL7s4JqoWSSu44Is6cKwl1UCjrg3l4C00LiM4nZQ6" //se coloca la llave publica

const stripeTestPromise = loadStripe(PUBLIC_KEY);                       //se crea una variable en la que se almacena la key

export default function StripeContainer() {                             //se crea una funcion para el contenedor de stripe
    return (                                                            //se retorna el contenedor de stripe                    
        <Elements stripe={stripeTestPromise}>                           {/*se llama al elemento al formulario de del pago  */}
                <PaymentForm/>                                          {/*se llama al formulario de pago  */}                    
        </Elements>
    )
}