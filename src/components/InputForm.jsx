import React from 'react'

function InputForm({
  id,
  handleChange,
  value,
  placeholder,
  type = "text"
}) {
  return (
    <div className='space-y-8'>
      <input 
        className='bg-gray-800 px-4 py-2 rounded-xl outline-0 placeholder:text-sm w-full'
        id={id}
        onChange={handleChange}
        value={value}
        type={type}
        placeholder={placeholder}
        />
    </div>
  )
}

export default InputForm