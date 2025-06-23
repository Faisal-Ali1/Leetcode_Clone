import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from "react-redux";
import { loginUser } from "../authSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

const loginSchema = z.object({
  email: z.string().email("invilid email"),
  password: z.string().min(6, "invilid password")
});

function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });

  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated)
      navigate('/')
  }, [isAuthenticated])


  const submitData = (data) => {
    console.log(data);
    dispatch(loginUser(data));

  }

  return (
    <>
      <div className='flex justify-center items-center min-h-screen p-4'> {/*centering container */}
        <div className='  shadow-xl bg-base-100 rounded-xl flex flex-col items-center p-5 min-w-[35%]  '> {/*existing card style*/}
          <h2 className='card-title text-3xl justify-center mb-5'>LeetCode</h2>

          <form onSubmit={handleSubmit(submitData)} className="  w-80 flex flex-col gap-2 mb-2">

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

            {/* <input type="submit" className="btn btn-sm  btn-primary" /> */}
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <span>Dont have account? <NavLink to="/signup" className="text-blue-700 hover:text-red-500">Sign up</NavLink> </span>
        </div>
      </div>
    </>
  );
}


export default Login;