import axios from 'axios';
import React, { useState, useTransition, useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`, { username:name, email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        navigate('/login');
      })
      .catch((error) => {
        console.log('error', error);
      });
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Sign up for an account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor={nameId}>Name</label>
              <input
                type="text"
                placeholder="Name"
                id={nameId}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor={emailId}>Email</label>
              <input
                type="email"
                placeholder="Email"
                id={emailId}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor={passwordId}>Password</label>
              <input
                type="password"
                placeholder="Password"
                id={passwordId}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                type="submit"
                disabled={isPending}
              >
                {isPending ? 'Signing up...' : 'Sign up'}
              </button>
              <Link to="/login" className="text-sm text-blue-600 hover:underline pl-3">Already have an account? Login</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

