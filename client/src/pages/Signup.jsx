import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { API_URL } from '../const/API_URL';

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all the fields');
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-blue text-white flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6 dark:text-white text-gray-600">SIGN UP</h1>
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <div>
          <Label value="Your Username" />
          <TextInput
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <Label value="Your Email" />
          <TextInput
            type="email"
            placeholder="name@yourcompany.com"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <Label value="Your Password" />
          <TextInput
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <Button type="submit" color="success" size="lg" disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            'Sign Up'
          )}
        </Button>
        <OAuth />
      </form>
      <p className="mt-5 text-sm dark:text-white text-gray-600">
      Already a member?{' '}
        <Link to="/sign-in" className="text-green-400">
          Sign In
        </Link>
      </p>
      {errorMessage && (
        <Alert className="mt-5 w-80" color="failure">
          {errorMessage}
        </Alert>
      )}
    </div>  
  );
};

export default Signup;
