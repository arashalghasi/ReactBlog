import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDaiXrOaNRBsGCdVw5hXptBjACMtFPAWmo",
  authDomain: "my-react-blog-e8fb9.firebaseapp.com",
  projectId: "my-react-blog-e8fb9",
  storageBucket: "my-react-blog-e8fb9.appspot.com",
  messagingSenderId: "604940281919",
  appId: "1:604940281919:web:223dc640329774a54cb08a"
};
const app = initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
