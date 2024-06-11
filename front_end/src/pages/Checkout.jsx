import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Luhn from "luhn-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const Checkout = () => {
  const [visaNumber, setVisaNumber] = useState("");
  const [isValidCard, setIsValidCard] = useState(false);
  const [cvv, setCVV] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [isExpirationDateValid, setIsExpirationDateValid] = useState(false);
  const [isCVVValid, setIsCVVValid] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [isValid, setIsValid] = useState(true);
  const baseUrl = process.env.REACT_APP_API_URL;

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentIntent, setPaymentIntent] = useState(null);

  const handlePostalCodeChange = (event) => {
    const inputPostalCode = event.target.value;
    const isValidPostalCode = /^[0-9]{5}(?:-[0-9]{4})?$/.test(inputPostalCode);
    setIsValid(isValidPostalCode);
    setPostalCode(inputPostalCode);
  };

  const handleVisaNumberChange = (event) => {
    const cleanedNumber = event.target.value.replace(/\D/g, "");
    const formattedNumber = cleanedNumber.replace(/(\d{4})/g, "$1 ");
    setVisaNumber(formattedNumber.trim());
    cleanedNumber.length === 16
      ? setIsValidCard(Luhn.isValid(cleanedNumber))
      : setIsValidCard(false);
  };

  const handleCVVChange = (event) => {
    const inputCVV = event.target.value;
    const isValidCVV = /^\d{3,4}$/.test(inputCVV);
    setIsCVVValid(isValidCVV);
    console.log(isValidCVV);
    setCVV(inputCVV);
  };

  const handleExpirationDateChange = (event) => {
    const inputExpirationDate = event.target.value;
    const isValidExpirationDate = /^\d{2}\/\d{2}$/.test(inputExpirationDate);
    setIsExpirationDateValid(isValidExpirationDate);
    console.log(isValidExpirationDate);
    setExpirationDate(inputExpirationDate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Send paymentMethod.id to your server
      const response = await fetch(
        `${baseUrl}/api/payment/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ payment_method_id: paymentMethod.id }),
        }
      );

      const paymentIntentResult = await response.json();

      if (paymentIntentResult.error) {
        setErrorMessage(paymentIntentResult.error);
      } else {
        setPaymentIntent(paymentIntentResult.paymentIntent);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="w-full px-10 pt-2">
        <Form onSubmit={handleSubmit} className="w-full">
          <CardElement />
          <div className="flex flex-col items-center">
            <button type="submit" disabled={!stripe} className=" border px-3">
              Pay
            </button>
            {errorMessage && <div className=" text-red-600">{errorMessage}</div>}
            {paymentIntent && <div className=" text-green-600">Payment Successful!</div>}
          </div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              Email <font color="red">*</font>
            </Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              Name <font color="red">*</font>
            </Form.Label>
            <Form.Control type="input" placeholder="Your Full Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
            <Form.Label>
              Billing Details <font color="red">*</font>
            </Form.Label>
            <Form.Control type="country" placeholder="Country" />
            <Form.Control
              type="address"
              placeholder="Address"
              className="mt-1"
            />
            <InputGroup className="mb-3 mt-1">
              <Form.Control aria-label="City" placeholder="City" />
              <Form.Control
                aria-label="Post Code"
                placeholder="Post Code"
                value={postalCode}
                onChange={handlePostalCodeChange}
                style={!isValid ? { color: "red" } : {}}
              />
            </InputGroup>
          </Form.Group>
          <div className="pay-part">
            <InputGroup className="mb-3 flex flex-nowrap">
              <Button
                size="lg"
                variant="outline-dark items-center"
                style={{ display: "flex" }}
                className="w-full"
              >
                <img src="/images/card.png" className="w-[20%]" alt="" />
                <span>CARD</span>
              </Button>
              <Button
                size="lg"
                variant="outline-dark items-center"
                style={{ display: "flex" }}
                className="w-full"
              >
                <img src="/images/applepay.png" className="w-[20%]" alt="" />
                <span>APPLE PAY</span>
              </Button>
            </InputGroup>
            <Form.Group
              className="mb-3 relative"
              controlId="exampleForm.ControlTextarea3"
            >
              <Form.Label>
                Card Number <font color="red">*</font>
              </Form.Label>
              <Form.Control
                type="input"
                placeholder="1234 1342 1232 1234"
                value={visaNumber}
                onChange={handleVisaNumberChange}
                style={!isValidCard ? { color: "red" } : {}}
              />
              <div className="pay-cards absolute right-3 top-10 ">
                <img src="/images/pay-card.png" alt="" />
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea4"
            >
              <Form.Label>
                Expiration <font color="red">*</font>
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                  placeholder="12/25"
                  style={!isExpirationDateValid ? { color: "red" } : {}}
                />
                <Form.Control
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={handleCVVChange}
                  style={!isCVVValid ? { color: "red" } : {}}
                />
              </InputGroup>
            </Form.Group>
          </div>
        </Form>
      </div>

      <div className="px-5 py-3" style={{ backgroundColor: "#00274C" }}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start justify-between text-white ">
            <h4>10GB</h4>
            <h6>100 MINUTES</h6>
          </div>
          <div className="flex flex-col items-start justify-between text-white">
            <p>TOTAL</p>
            <h4>€ 53.00 USD</h4>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center justify-between text-white ">
            <span className="mr-5">eSIM</span>
            <img
              src="/images/Vector.png"
              className="rounded-circle mr-3"
              alt=""
            />
          </div>
          <div className="flex flex-col items-start justify-between text-white">
            <h6>UNITED ARAB EMIRATES</h6>
            <p>VALID FOR 30 DAYS</p>
          </div>
        </div>
        <Button variant="outline-light" className="w-full">
          Place Order
        </Button>
      </div>
    </div>
  );
};
export default Checkout;
