import React, { useState } from 'react'
import InputForm from '../components/InputForm'
import useTodoStore from '../stores/todoStore';
import useAuthStore from '../stores/authStore';
import { schemaTodo } from '../validator/schemaTodo';
import todoApi from '../apis/todoApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import * as Yup from "yup";

const initialInput = {
  taskName:"",
  userId: "18"
}


function TodoPage() {
  const [input, setInput] = useState(initialInput)
  const [inputError, setInputError] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const todos = useTodoStore((state) => state.todos)
  const actionFetchTodo = useTodoStore((state) => state.actionFetchTodo)
  const userId = useAuthStore((state) => state.userId)

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
    setInputError((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // setIsLoading(true);

      //validate
      schemaTodo.validateSync(input, { abortEarly: false });

      //api
      const res = await todoApi.createTodo(input);
      console.log("res", res.data);

      setInput(initialInput)
      navigate('/todo')

      //alert
      toast.success("Create success!!")
    } catch (error) {
      // console.log(error);
      toast.error("กรุณากรอกข้อมูล!")

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
      <form onSubmit={handleSubmit} className='w-2/5 h-3/5 p-4 border rounded-2xl mx-auto space-y-4'>
          <h1>My Todo</h1>
          <div className='bg-gray-950 flex rounded-xl w-fit'>
            <InputForm
              id="taskName"
              placeholder="new task"
              handleChange={handleChange}
              error={inputError.taskName}
              value={input.taskName}
              text="Task"
           />
          </div>
        </form>
    </div>
  )
}

export default TodoPage