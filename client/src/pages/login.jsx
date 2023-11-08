//import dependencies
import React, { useState } from 'react';
import { useMutation } from '@apollo/client'; 
import LOGIN_MUTATION from './your-login-mutation'; 


function Login() {
    //State will store user data
    const [userData, setUserData] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_MUTATION);
    //function to handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };
    //Form Submission function
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try{
            const { data } = await login({
                variables: {
                  email: userData.email,
                  password: userData.password,
                },
              });
            if (data.login) {
                console.log('User logged in successfully');
            } 
            else{
                console.log('User login failed');
            }
        }   
            catch (err) {
            console.log('GraphQL error:', err);
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
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;


