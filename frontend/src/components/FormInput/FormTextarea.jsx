import React from 'react';

function FormTextarea({label, name, error, value, placeholder, onChange, type = "text"}) {
  return <div>
            <label className="block mb-2 text-teal-500" htmlFor={name}>{label}</label>
            <textarea
                type={type}
                name={name}
                onChange={onChange}
                className={`rounded w-full p-2 border-b-2 ${!error ? "mb-6 border-teal-500 " : "border-red-500 "} text-teal-700 outline-none focus:bg-gray-300`}
                placeholder={placeholder}
                value={value}
            />
            {error && <span className='mb-3 text-red-500' >{error}</span>}
        </div>
}

export default FormTextarea;
