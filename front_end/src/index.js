import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
const stripePromise = loadStripe('your-publishable-key');

root.render(
    <GoogleOAuthProvider clientId="1035345828770-031o8fsst85t62pt5t75kviq0qflca8q.apps.googleusercontent.com">
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <Elements stripe={stripePromise}>
                        <App />
                    </Elements>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
