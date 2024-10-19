import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function SignUpOtp({ verificationId }) {
    const [emailVerified, setEmailVerified] = useState(false);
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            data.verificationId = verificationId;
            const res = await axios.post('http://localhost:5000/api/auth/verifyOtp', data);
            if (res && res.data.success == 1) {
                const token = res.data.token;
                const user = res.data.user;
                localStorage.setItem('authToken', token);
                localStorage.setItem('authUser', user);
                setEmailVerified(true);
                setTimeout(() => {
                    navigate('/dashboard/jobpost');
                }, 2000);
            }
            else if (res.data.success == 0) {
                setError('emailOtp', { type: 'manual', message: res.data.message });
            }
        } catch (error) {
            console.error('Error verfiying user', error);
        }
    };

    return (
        <>
            <div className='flex flex-col gap-6 w-full'>
                {/* Email OTP Form */}
                <form id="emailOtpForm" onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full'>
                    <div className="form-group">
                        <label htmlFor="emailOtp" className="sr-only">Email OTP</label>
                        <div className="flex items-center border border-gray-300 rounded-md bg-gray-100">
                            <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 m-3 text-lg" />
                            <input
                                type="text"
                                id="emailOtp"
                                {...register('emailOtp', { required: 'Email OTP is required' })}
                                placeholder="Email OTP"
                                className="bg-transparent focus:outline-none flex-grow text-lg text-zinc-600 font-normal"
                            />
                            {emailVerified && (
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 m-3 text-lg" />
                            )}
                        </div>
                        {errors.emailOtp && <p className="text-red-500">{errors.emailOtp.message}</p>}
                    </div>
                    <button type="submit" className="text-white bg-blue-500 rounded-md text-center w-full text-xl font-semibold py-1 outline-0">Verify</button>
                </form>

                {/* Mobile OTP Form */}
                {/* <form id="mobileOtpForm" onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full'>
                <div className="form-group">
                    <label htmlFor="mobileOtp" className="sr-only">Mobile OTP</label>
                    <div className="flex items-center border border-gray-300 rounded-md bg-gray-100">
                        <FontAwesomeIcon icon={faPhone} className="text-gray-500 m-3 text-lg" />
                        <input
                            type="text"
                            id="mobileOtp"
                            {...register('mobileOtp', { required: true })}
                            placeholder="Mobile OTP"
                            className="bg-transparent focus:outline-none flex-grow text-lg text-zinc-600 font-normal"
                        />
                    </div>
                    {errors.mobileOtp && <p className="text-red-500">Mobile OTP is required</p>}
                </div>
                <button type="submit" className="text-white bg-blue-500 rounded-md text-center w-full text-xl font-semibold py-1 outline-0">Verify</button>
            </form> */}
            </div>
        </>
    );
}