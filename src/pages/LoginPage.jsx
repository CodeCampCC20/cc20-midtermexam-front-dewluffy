import React, { useState } from 'react'
import InputForm from '../components/InputForm'
import { useNavigate } from 'react-router'
import { Loader2, LogInIcon } from 'lucide-react'
import { schemaLogin } from '../validator/schemaLogin'
import * as Yup from "yup"
import { toast } from 'react-toastify'
import authApi from '../apis/authApi'

const initialInput = {
  username:"",
  password:"",
}

function LoginPage() {
  const [input, setInput] = useState(initialInput)
  const [isLoading, setIsLoading] = useState(false)
  const [inputError, setInputError] = useState(initialInput)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
    setInputError((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      //validate
      schemaLogin.validateSync(input, { abortEarly: false });

      //api
      const res = await authApi.login(input);
      console.log("res", res.data);

      setInput(initialInput)
      navigate('/todo')

      //alert
      toast.success("Login success!!")
    } catch (error) {
      console.log(error);
      toast.error("Login invalid!!")

      if (error instanceof Yup.ValidationError) {
        const err = error.inner.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          return acc;
        }, {});
        setInputError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
    <div className='h-screen flex items-center'>
      <form 
      onSubmit={handleSubmit}
      className='flex flex-col items-center w-2/5 h-fit p-4 border rounded-2xl mx-auto space-y-8'>
        <h1 className='font-bold text-3xl'>Login</h1>
          <InputForm
            id ="username"
            placeholder="Enter your username"
            handleChange={handleChange}
            error={inputError.username}
            value={input.username}
            text="text"
          />
          <InputForm
            id ="password"
            placeholder="Enter your password"
            handleChange={handleChange}
            error={inputError.password}
            value={input.password}
            text="password"
            type="password"
          />
          
          <button
          disabled={isLoading}
            className='w-2/5 py-2 flex justify-center gap-2 bg-gray-700 rounded-2xl cursor-pointer'>
              {isLoading ? (
                <>
                  <Loader2 className='w-5 h-5 animate-spin' />
                  <span>Loading ...</span>
                </>
              ) : (
                <>
                  <LogInIcon className='w-5 h-5' />
                  <span>Login</span>
                </>
              )}
          </button>
          <button
            onClick={()=>navigate("/register")}
            className='w-2/5 py-2 flex justify-center gap-2 bg-gray-700 rounded-2xl cursor-pointer'>
            Register
          </button>
        </form>
    </div>
  )
}

export default LoginPage