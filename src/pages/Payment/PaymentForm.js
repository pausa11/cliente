import React, { useState, useContext} from "react";
import { CardElement,useElements, useStripe } from "@stripe/react-stripe-js";
import { ShopContext } from "../../context/shop-context";
import axios from "axios";
import './payment.css';
import { Link } from "react-router-dom";

const CARD_OPTIONS = {
  iconStyle: "solid",
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

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { setCartItems, getDefaultCart } = useContext(ShopContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.log('Stripe or Elements is not available');
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.log('Card element is not available');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });

    const amount = 10000000;

    if (!error) {
      try {
        const { id } = paymentMethod;

        let status;
        if (paymentMethod.card.last4 === "4242") {
          // Payment successful for card ending in "4242"
          status = "succeeded";
        } else {
          // Payment failed for other cards
          status = "failed";
        }

        const response = await axios.post(('https://tiendaxd.onrender.com/payment' || 'http://localhost:3001/payment'), {
          amount,
          id
        });

        console.log(`The payment status is: ${status}`);

        if (response.status === 200 && status === "succeeded") {
          console.log('Successful payment');
          setSuccess(true);
        } else {
          console.log('Payment error');
          
          alert("Ha ocurrido un error al procesar el pago, por favor intente de nuevo");
        }
      } catch (error) {
        console.log('Error:', error.response.data);
      }
    } else {
      console.log('Stripe error:', error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit} className="payment-form">
          <fieldset className="form-group">
            <div className="form-row">
              <CardElement options={CARD_OPTIONS} className="card-element" />
            </div>
          </fieldset>
          <button className="pay-button">Pay</button>
        </form>
      ) : (
        <div className="successfulContainer">
          <div className="successfulPayment">
            <h2>Payment Successful</h2>
            <Link to="/shop">
            <button className="homeButton" onClick={() => setCartItems(getDefaultCart())}>Home</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}