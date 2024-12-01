import { React, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function Home() {
    const authToken = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(authToken);
    const userId = decodedToken.userId;
    const [jobs, setJobs] = useState([]);
    useEffect(() => { fetchJobs(userId); }, [userId]);
    const fetchJobs = async (userId) => {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/job/fetchJobs`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId }),
        });
        const response = await res.json();
        if (response && response.success) {
            setJobs(response.data);
        }
    };
    return (
        <>
            <div className="p-8 w-full bg-gray-100 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Job Listings</h1>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold">
                        Create Interview
                    </button>
                </div>

                <div className="overflow-x-auto rounded-2xl">
                    <table className="w-full table-auto bg-white shadow-lg rounded-2xl">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 text-left">
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Experience Required</th>
                                <th className="px-4 py-2">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job, index) => (
                                <tr
                                    key={job._id}
                                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-blue-50`}
                                >
                                    <td className="px-4 py-2 text-gray-800">{job.title}</td>
                                    <td className="px-4 py-2 text-gray-600">{job.description}</td>
                                    <td className="px-4 py-2 text-gray-600">{job.experienceLevel}</td>
                                    <td className="px-4 py-2 text-gray-600">{job.endDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Home;