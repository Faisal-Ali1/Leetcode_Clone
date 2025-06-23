import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerUser } from '../authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { NavLink } from 'react-router';
import axiosClient from '../utils/axiosClient';


// signup Schema validation

const signupSchema = z.object({
  firstname: z.string().min(5, "FirstName should contain atleast 5 character"),
  email: z.string().email("Invalid email_id"),
  password: z.string().min(6, "password should contain atleast 6 character")
})

function Signup() {

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(signupSchema) });


  //  initail error
  // const errors = {
  //   firstname: undefined,
  //   email: undefined,
  //   password: nudefined
  // }

  //  after getting error
  // const errors = {
  //   firstname:{
  //     type: "minLength", //types of validation that failed
  //     message: "FirstName should contain atleast 3 character"
  //   }
  // }
 const { isAuthenticated } = useSelector((state)=> state.auth);

//  const response = axiosClient.post('/user/')


  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(isAuthenticated)
      navigate('/login')
  } , [isAuthenticated]);


  const submitData = (data) => {
    console.log(data)
    dispatch(registerUser(data));

  }

  return (
    <>
      <div className='flex justify-center items-center min-h-screen p-4'> {/*centering container */}
        <div className='  shadow-xl bg-base-100 rounded-xl p-5 flex flex-col items-center min-w-[35%]  '> {/*existing card style*/}
          <h2 className='card-title text-3xl justify-center mb-5'>LeetCode</h2>

          <form onSubmit={handleSubmit(submitData)} className="  w-80 flex flex-col gap-2 mb-2">

            <div className='form-control h-22'>
              <label className='label'>
                <span className='label-text mb-1'>First name:</span>
              </label>
              <input {...register('firstname', { required: true })} placeholder="john" className='input' />
              {errors.firstname ? <span className='text-[12px] text-red-600'>{errors.firstname.message}</span> : null}
            </div>

            <div className='form-control h-22'>
              <label className='label' >
                <span className='label-text mb-1'>Email: </span>
              </label>
              <input {...register('email', { required: true })} placeholder="john@gmail.com" className='input' />
              {errors.email && <span className='text-xs text-red-600'>{errors.email.message}</span>}


            </div>

            <div className='form-control h-22'>
              <label className='label'>
                <span className='label-text mb-1'>Password:</span>
              </label>
              <input {...register('password', { required: true })} placeholder="*******" type='password' className='input' />
              {errors.password && <span className='text-xs text-red-600'>{errors.password.message}</span>}
            </div>

            <input type="submit" className="btn btn-sm  btn-primary" />
          </form>
          
          <span>already have account? <NavLink to="/login" className="text-blue-700 hover:text-red-500">Sign in</NavLink> </span>
        </div>
      </div>
    </>
  );
}

export default Signup;



