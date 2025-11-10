import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Register Page</h2>
      <p>This is a placeholder for the registration form.</p>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
};

export default Register;