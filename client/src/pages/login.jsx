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
    const handleFormSubmit = async (event) => {
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
            catch (err) {
            console.log(err);
        }
    
    };
    return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;


