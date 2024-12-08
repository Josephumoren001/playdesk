import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../const/API_URL';

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser); // Correctly define currentUser

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      const headers = {
        'Content-Type': 'application/json',
      };

      if (currentUser?.token) {
        headers.Authorization = `Bearer ${currentUser.token}`;
      }

      const res = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();
      console.log('Google sign-in response:', data); // Debug log
      if (res.ok) {
        dispatch(signInSuccess({ user: data.user, token: data.token }));
        localStorage.setItem('access_token', data.token); // Store the token in local storage
        navigate('/');
      } else {
        throw new Error(data.message || 'Failed to sign in with Google');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      // Optionally display an error message to the user
    }
  };

  return (
    <Button
      type='button'
      gradientDuoTone='pinkToOrange'
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className='w-6 h-6 mr-2' />
      Continue with Google
    </Button>
  );
}
