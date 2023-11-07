//import dependencies
import React, { useState } from 'react';

function Login() {
    //State will store user data
    const [userData, setUserData] = useState({ email: '', password: '' });
    //function to handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };
    //Form Submission function
    const handleFormSubmit = (event) => {
        event.preventDefault();
        try{
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.status === 200) {
                console.log('User logged in successfully');
            } 
            else{
                console.log('User login failed');
            }

    
        }
    
    //need to finish
    
    
    };







}
