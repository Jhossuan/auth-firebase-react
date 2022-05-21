import { forwardRef } from "react";

const InputsForm = forwardRef(({type, placeholder, children, onChange, name, onBlur, label, error},ref) => {
  const errorLabel = error ? 'block mb-2 text-sm font-medium text-red-700 dark:text-red-500' : 'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
  const errorForms = error ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400' : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
  return (
    <div className="mb-6">
      <label htmlFor="email" className={errorLabel}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        ref={ref}
        className={errorForms}
      />
      {children}
    </div>
  );
})

export default InputsForm;