import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function JobPost() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm();

  const [candidateEmails, setCandidateEmails] = useState([]);
  const [candidateEmail, setCandidateEmail] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleAddEmail = () => {
    clearErrors('candidateEmail');
    if (candidateEmail && !candidateEmails.includes(candidateEmail)) {
      if(!emailRegex.test(candidateEmail)) {
        setError('candidateEmail', { type: 'manual', message: 'Invalid email' });
        setCandidateEmail("");
        return false;
      }
      setCandidateEmails([...candidateEmails, candidateEmail]);
      setCandidateEmail("");
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setCandidateEmails(candidateEmails.filter(email => email !== emailToRemove));
  };

  const onSubmit = async (jobDetails) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const decodedToken = jwtDecode(authToken);
      const userId = decodedToken.userId;
      jobDetails.userId = userId;
      if(candidateEmails) {
        jobDetails.candidateEmails = candidateEmails;
      }
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/job/postJob`, jobDetails, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );
      if (res.data.success) {
        alert('Job posted successfully');
        navigate('/dashboard/home');
      }
    } catch (error) {
      console.error('Job post error:', error);
    }
  };

  return (
    <>
      <div className="mt-16 bg-white w-1/2 px-6">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>
          <div className="flex items-start justify-between flex-wrap">
            <label htmlFor="title" className="text-lg font-normal text-end whitespace-nowrap text-gray-800 w-1/4  ">Job Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter Job Title"
              className="border border-gray-300 focus:border-blue-500 focus:outline-none rounded-md w-8/12 p-2"
              {...register('title', { required: 'Job title is required' })}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          <div className="flex items-start justify-between flex-wrap">
            <label htmlFor="description" className="text-lg font-normal text-end whitespace-nowrap text-gray-800 w-1/4  ">Job Description</label>
            <textarea
              id="description"
              placeholder="Enter Job Description"
              className="border border-gray-300 focus:border-blue-500 focus:outline-none rounded-md w-8/12 p-2 resize-none"
              rows="3"
              {...register('description', { required: 'Job description is required' })}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div className="flex items-start justify-between flex-wrap">
            <label htmlFor="experienceLevel" className="text-lg font-normal text-end whitespace-nowrap text-gray-800 w-1/4  ">Experience Level</label>
            <select
              id="experienceLevel"
              className="border border-gray-300 focus:border-blue-500 focus:outline-none text-gray-800 rounded-md w-8/12 p-2"
              {...register('experienceLevel', { required: 'Experience level is required' })}
            >
              <option value="">Select Experience Level</option>
              <option value="1">Junior</option>
              <option value="2">Mid</option>
              <option value="3">Senior</option>
            </select>
            {errors.experienceLevel && <p className="text-red-500 text-sm">{errors.experienceLevel.message}</p>}
          </div>
          <div className="flex items-start justify-between flex-wrap text-gray-400 font-medium">
            <label htmlFor="candidateEmail" className="text-lg font-normal text-end whitespace-nowrap text-gray-800 w-1/4 ">Add Candidate</label>
            <div className='flex flex-wrap gap-2 border border-gray-300 focus:border-blue-500 rounded-md w-8/12 p-2'>
              {candidateEmails.map((email, index) => (
                <span key={index} className="border border-gray-400 p-2 rounded-full flex items-center justify-between text-xs gap-1">
                  <span>{email}</span>
                  <FontAwesomeIcon icon={faTimes} className="text-gray-600 cursor-pointer" size="lg" onClick={() => handleRemoveEmail(email)} />
                </span>
              ))}
              <input
                type="email"
                id="candidateEmail"
                placeholder=""
                className="border-none focus:outline-none max-w-fit"
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddEmail();
                  }
                }}
              />
            {errors.candidateEmail && <p className="text-red-500 text-sm">{errors.candidateEmail.message}</p>}
            </div>
          </div>
          <div className="flex items-start justify-between flex-wrap">
            <label htmlFor="endDate" className="text-lg font-normal text-end whitespace-nowrap text-gray-800 w-1/4  ">End Date</label>
            <input
              type="date"
              id="endDate"
              placeholder="Select date"
              min={new Date().toISOString().split('T')[0]}
              className="border border-gray-300 focus:border-blue-500 focus:outline-none rounded-md w-8/12 p-2"
              {...register('endDate', { required: 'End date is required' })}
            />
            {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-10 py-2 text-base font-bold"
            >Send</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default JobPost;
