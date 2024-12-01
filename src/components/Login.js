import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import Header from './header';


function Login() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, formData);
      if (res.data.success === 0) setError('email', { type: 'manual', message: res.data.message });
      else if(res.data.success && res.data.success === -2){
        setError('email', { type: 'manual', message: res.data.message });
        setTimeout(() => {
          navigate('/register', { state: { step: 2, userId: res.data.data.userId } });
        }, 2000);
      }
      else if (res.data.success && res.data.success === -1) setError('password', { type: 'manual', message: res.data.message });
      else if (res.data.success && res.data.success === 1) {
        const token = res.data.token;
        const user = res.data.user;
        localStorage.setItem('authToken', token);
        localStorage.setItem('authUser', user);
        setTimeout(() => {
          navigate('/dashboard/jobpost');
        }, 2000);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <Header />
      <main className='flex flex-wrap justify-between m-28'>
        <div className='flex items-center w-2/5'>
          <span>Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</span>
        </div>
        <div className="signup-form-container p-[1px] w-2/5 bg-gradient-to-r to-[#AA54FF] from-[#3F71FF] rounded-2xl  ">
          <div className="bg-white p-10 rounded-2xl flex flex-col items-center gap-10">
            <div className='flex flex-col items-center justify-center'>
              <span className='font-sans text-3xl font-semibold'>Sign In</span>
              <span className='font-medium text-center text-charcoal'>Lorem Ipsum is simply dummy text</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-7 w-full'>
              <div className="form-group right-0">
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-100">
                  <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 m-3 text-lg" />
                  <input
                    type="email"
                    id="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email"
                    className="bg-transparent focus:outline-none flex-grow text-lg text-zinc-600 font-normal"
                  />
                </div>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-100">
                  <FontAwesomeIcon icon={faKey} className="text-gray-500 m-3 text-lg" />
                  <input
                    type="password"
                    id="password"
                    {...register("password", { required: "Password is required" })}
                    placeholder="Password"
                    className="bg-transparent focus:outline-none flex-grow text-lg text-zinc-600 font-normal"
                  />
                </div>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
              <button type="submit" className="text-white bg-blue-500 rounded-md text-center w-full text-xl font-semibold py-1 outline-0">Sign in</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
