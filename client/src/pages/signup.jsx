import React, { useState } from 'react';

function Signup (){
    const [formData, setFormData] = useState({ email: '', password: '' });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.status === 200) {
                console.log('User created successfully');
            } 
            else{
                console.log('Failed to create user');
            }
        }   
            catch (err) {
            console.log(err);
        }
    
    };
    return (
    <div>
      <h2>Signup</h2>
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
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );

}
export default Signup;