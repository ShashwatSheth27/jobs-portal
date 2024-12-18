import React, { useState } from 'react';
import Header from './header';
import SignUpDetails from './SignUpDetails';
import SignUpOtp from './SignUpOtp';
import { useLocation } from 'react-router-dom';

function Register() {
  const location = useLocation();
  let defaultStep = 1;
  let user_id = null;
  if(location.state && location.state.step) defaultStep = location.state.step;
  if(location.state && location.state.userId) user_id = location.state.userId;
  const [step, setStep] = useState(defaultStep);
  const [userId, setUserId] = useState(user_id);

  const handleDetailsSubmit = (registeredUserId) => {
    setUserId(registeredUserId);
    setStep(2);
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
              <span className='font-sans text-3xl font-semibold'>Sign Up</span>
              <span className='font-medium text-center text-charcoal'>Lorem Ipsum is simply dummy text</span>
            </div>
            {step === 1 ? ( <SignUpDetails callback={handleDetailsSubmit} />
            ) : ( <SignUpOtp verificationId={userId} /> )}
          </div>
        </div>
      </main>
    </>

  );
}

export default Register;
