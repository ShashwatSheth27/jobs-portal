import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

export default function SignUpDetails({ callback }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (formData) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/registerUserDetails`, formData);
            if(res && res.data && res.data.success){
                callback(res.data.data.userId);
            }
        } catch (error) {
            console.error('Error registering user', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-7 w-full'>
                <div className="form-group">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <div className="flex items-center border border-gray-300 rounded-md bg-gray-100">
                        <FontAwesomeIcon icon={faUser} className="text-gray-500 m-3 text-lg" />
                        <input
                            type="text"
                            id="name"
                            {...register("name", { required: "Name is required" })}
                            placeholder="Name"
                            className="bg-transparent focus:outline-none flex-grow text-lg text-zinc-600 font-normal"
                        />
                    </div>
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                <div className="form-group right-0">
                    <label htmlFor="phone" className="sr-only">Phone No.</label>
                    <div className="flex items-center border border-gray-300 rounded-md bg-gray-100">
                        <FontAwesomeIcon icon={faPhone} className="text-gray-500 m-3 text-lg" />
                        <input
                            type="text"
                            id="phone"
                            {...register("phone", { required: "Phone number is required" })}
                            placeholder="Phone no."
                            className="bg-transparent focus:outline-none flex-grow text-lg text-zinc-600 font-normal"
                        />
                    </div>
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="companyName" className="sr-only">Company Name</label>
                    <div className="flex items-center border border-gray-300 rounded-md bg-gray-100">
                        <FontAwesomeIcon icon={faUser} className="text-gray-500 m-3 text-lg" />
                        <input
                            type="text"
                            id="companyName"
                            {...register("companyName", { required: "Company Name is required" })}
                            placeholder="Company Name"
                            className="bg-transparent focus:outline-none flex-grow text-lg text-zinc-600 font-normal"
                        />
                    </div>
                    {errors.companyName && <p className="text-red-500">{errors.companyName.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="companyEmail" className="sr-only">Company Email</label>
                    <div className="flex items-center border border-gray-300 rounded-md bg-gray-100">
                        <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 m-3 text-lg" />
                        <input
                            type="email"
                            id="companyEmail"
                            {...register("companyEmail", { required: "Company email is required" })}
                            placeholder="Company Email"
                            className="bg-transparent focus:outline-none flex-grow text-lg text-zinc-600 font-normal"
                        />
                    </div>
                    {errors.companyEmail && <p className="text-red-500">{errors.companyEmail.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="employeeSize" className="sr-only">Employee Size</label>
                    <div className="flex items-center border border-gray-300 rounded-md bg-gray-100">
                        <FontAwesomeIcon icon={faPeopleGroup} className="text-gray-500 m-3 text-lg" />
                        <input
                            type="text"
                            id="employeeSize"
                            {...register("employeeSize", { required: "Employee Size is required" })}
                            placeholder="Employee Size"
                            className="bg-transparent focus:outline-none flex-grow text-lg text-zinc-600 font-normal"
                        />
                    </div>
                    {errors.employeeSize && <p className="text-red-500">{errors.employeeSize.message}</p>}
                </div>

                <div className="terms text-center text-base font-bold text-charcoal">
                    <p>
                        By clicking on proceed you will accept our <br />
                        <a href="/"><span className='text-blue-500'>Terms</span> & <span className='text-blue-500'>Conditions</span></a>
                    </p>
                </div>

                <button type="submit" className="text-white bg-blue-500 rounded-md text-center w-full text-xl font-semibold py-1 outline-0">Proceed</button>
            </form>
        </>
    );
}