import React from "react";

const InputBox = ({
  label,
  type,
  value,
  onChange,
  name,
  id,
  placeholder,
  touched,
  errors,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="name" className="block font-bold mb-2">
        {label}
      </label>
      <input
        className="w-full p-2 border"
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      {touched && errors && <p className="text-red-500 text-sm">{errors}</p>}
    </div>
  );
};

export default InputBox;
