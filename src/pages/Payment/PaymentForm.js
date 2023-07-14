import React, { useState, useContext } from "react";                            // Importa React y useState
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";  // Importa CardElement, useElements y useStripe
import { ShopContext } from "../../context/shop-context";                       // Importa ShopContext
import axios from "axios";                                                      // Importa axios                
import './payment.css';                                                         // Importa el css de payment

const CARD_OPTIONS = {                                                          // Se crea la constante CARD_OPTIONS                   
  iconStyle: "solid",                                                           // Se usa el icono de solid
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
};

export default function PaymentForm() {                                       // Se crea la funcion PaymentForm 
  const context = useContext(ShopContext);                                    // Se crea la constante context que usa el useContext de ShopContext
  const [success, setSuccess] = useState(false);                              // Se crea la constante success que usa el useState de false
  const stripe = useStripe();                                                 // Se crea la constante stripe que usa el useStripe                
  const elements = useElements();                                             // Se crea la constante elements que usa el useElements

  const handleSubmit = async (e) => {                                         // Se crea la funcion handleSubmit                 
    e.preventDefault();                                                       // Se usa el preventDefault 
    if (!stripe || !elements) {                                               // Se usa el if para verificar si stripe o elements estan disponibles       
      console.log('Stripe or Elements is not available');                     // Se muestra en consola que Stripe o Elements no estan disponibles
      return;                                                                 // Se retorna                      
    }

    const cardElement = elements.getElement(CardElement);                     // Se crea la constante cardElement que usa el getElement de CardElement

    if (!cardElement) {                                                       // Se usa el if para verificar si cardElement esta disponible
      console.log('Card element is not available');                           // Se muestra en consola que cardElement no esta disponible
      return;                                                                 // Se retorna                      
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({       // Se crea la constante error y paymentMethod que usa el createPaymentMethod de stripe
      type: "card",                                                           // Se usa el tipo de card
      card: cardElement                                                       // Se usa el cardElement                 
    });

    if (!error) {                                                             // Se usa el if para verificar si error esta disponible
      try {                                                                   // Se usa el try
        const { id } = paymentMethod;                                         // Se crea la constante id que usa el paymentMethod
        const response = await axios.post('https://tiendaxd.onrender.com/products/book/' || 'http://localhost:3001/products/book/', {  // Se crea la constante response que usa el axios.post de payment
          amount: context.payAmount,                                          // Se usa el amount de context                  
          id                                                                     
        });                                                                   

        if (response.data.success) {                                          // Se usa el if para verificar si response.data.success esta disponible       
          console.log("Successful payment");                                  // Se muestra en consola que el pago fue exitoso
          setSuccess(true);                                                   // Se usa el setSuccess de true
        }
      } catch (error) {                                                       // Se usa el catch para mostrar el error en consola
        console.log("Error:", error.response.data);                           // Se muestra en consola el error
      }
    } else {                                                                  // Se usa el else               
      console.log("Stripe error:", error.message);                            // Se muestra en consola el error de stripe
    }
  };

  return (                                                                    // Se retorna               
    <>
      {!success ? (                                                           
        <form onSubmit={handleSubmit} className="payment-form">               {/* Se usa el onSubmit de handleSubmit y la clase payment-form */}
          <fieldset className="form-group">                                   {/* Se usa el fieldset de form-group */}
            <div className="form-row">                                        {/* Se usa el div de form-row */}                
              <CardElement options={CARD_OPTIONS} className="card-element" /> {/* Se usa el options de CARD_OPTIONS y la clase card-element */}
            </div>
          </fieldset>
          <button className="pay-button">Pay</button>                         {/* Se usa el boton de pay-button */}     
        </form>
      ) : (
        <div>
          <h2 className="success-message">Successful purchase</h2>            {/* Se usa el h2 de success-message */}
        </div>
      )}
    </>
  );
}