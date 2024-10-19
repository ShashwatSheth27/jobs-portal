import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function JobPost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        const decodedToken = jwtDecode(authToken);
        data.userId = decodedToken.userId;
      }
      const res = await axios.post('http://localhost:5000/api/job/postJob', data);
      if (res.data.success) {
        alert('Job posted successfully');
      }
    } catch (error) {
      console.error('Job post error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 space-y-4 bg-white shadow-md rounded-md">
      <div className="flex items-center">
        <label htmlFor="title" className="w-40 font-bold text-gray-800">Job Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter Job Title"
          className="border border-gray-300 rounded-md w-full p-2"
          {...register('title', { required: 'Job title is required' })}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div className="flex items-center">
        <label htmlFor="description" className="w-40 font-bold text-gray-800">Job Description</label>
        <textarea
          id="description"
          placeholder="Enter Job Description"
          className="border border-gray-300 rounded-md w-full p-2"
          rows="3"
          {...register('description', { required: 'Job description is required' })}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <div className="flex items-center">
        <label htmlFor="experienceLevel" className="w-40 font-bold text-gray-800">Experience Level</label>
        <select
          id="experienceLevel"
          className="border border-gray-300 rounded-md w-full p-2"
          {...register('experienceLevel', { required: 'Experience level is required' })}
        >
          <option value="">Select Experience Level</option>
          <option value="1">Junior</option>
          <option value="2">Mid</option>
          <option value="3">Senior</option>
        </select>
        {errors.experienceLevel && <p className="text-red-500 text-sm">{errors.experienceLevel.message}</p>}
      </div>
      <div className="flex items-center">
        <label htmlFor="candidateEmail" className="w-40 font-bold text-gray-800">Add Candidate</label>
        <input
          type="email"
          id="candidateEmail"
          placeholder="Enter Candidate Email"
          className="border border-gray-300 rounded-md w-full p-2"
          {...register('candidateEmail', {
            required: false,
          })}
        />
        {errors.candidateEmail && <p className="text-red-500 text-sm">{errors.candidateEmail.message}</p>}
      </div>
      <div className="flex items-center">
        <label htmlFor="endDate" className="w-40 font-bold text-gray-800">End Date</label>
        <input
          type="date"
          id="endDate"
          className="border border-gray-300 rounded-md w-full p-2"
          {...register('endDate', { required: 'End date is required' })}
        />
        {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2"
        >
          Send
        </button>
      </div>
    </form>
  );
}

export default JobPost;
