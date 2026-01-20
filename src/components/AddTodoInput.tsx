import { CircleCheckBig, Plus } from 'lucide-react';
import type { ChangeEvent, FormEvent } from 'react';

type AddTodoProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (value: string) => void;
};

const AddTodoInput = ({ value, onChange, onSubmit }: AddTodoProps) => {
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='group relative flex items-center gap-3 rounded-xl bg-white dark:bg-gray-800/70 border border-gray-200/80 dark:border-gray-700/60 p-3 shadow-sm transition-smooth focus-within:shadow-md focus-within:shadow-primary/10 focus-within:border-primary/40 dark:focus-within:border-primary/50 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600'
    >
      {/* Left icon – always visible, subtle */}
      <CircleCheckBig
        className='text-gray-400 dark:text-gray-500 transition-colors group-focus-within:text-primary/80'
        strokeWidth={2.5}
      />

      {/* Input */}
      <input
        placeholder='What needs to be done?'
        autoComplete='off'
        autoFocus={true} // true for instant focus on mount
        value={value}
        onChange={onChange}
        required
        className='w-full bg-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500'
    
      />

      {/* Floating Plus button – appears on focus/hover */}
      <button
        type='submit'
        className='flex items-center justify-center rounded-full completeIcon opacity-0 group-focus-within:opacity-100 transition-smooth shadow-xl'
        aria-label='Add todo'
      >
        <Plus strokeWidth={2.5} />
      </button>
    </form>
  );
};

export default AddTodoInput;
