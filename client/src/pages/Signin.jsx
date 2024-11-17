import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { API_URL } from '../const/API_URL';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen bg-dark-blue text-white flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6 dark:text-white text-gray-600">SIGN IN</h1>
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <div>
          <Label value="Your Email" />
          <TextInput
            type="email"
            placeholder="Email"
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
            'Sign In'
          )}
        </Button>
        <OAuth />
      </form>
      <p className="mt-5 text-sm dark:text-white text-gray-600">
        Not a member?{' '}
        <Link to="/sign-up" className="text-green-400">
          Sign Up
        </Link>
      </p>
      {errorMessage && (
        <Alert className="mt-5 w-80" color="failure">
          {errorMessage}
        </Alert>
      )}
    </div>
  );
}
