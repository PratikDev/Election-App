import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: FC<InputProps> = ({ label, ...rest }) => {
  return (
    <div>
      <label
        htmlFor={rest.id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {rest.required && `*`}
      </label>

      <div className="mt-1">
        <input
          {...rest}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700/50 dark:text-white"
        />
      </div>
    </div>
  );
};

export default Input;
