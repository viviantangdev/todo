import { Circle, CircleCheckBig } from 'lucide-react';
import type { TodoItem } from '../context/todosContext';

type CompleteButtonProps = {
  item: TodoItem;
  onClick: () => void;
};

const CompleteButton = ({ item, onClick }: CompleteButtonProps) => {
  return (
    <button
      aria-label='Toggle complete todo'
      onClick={onClick}
      className=' flex-none'
    >
      {item.completed ? (
        <CircleCheckBig className='h-5 w-5 completeIcon' />
      ) : (
        <Circle className='h-5 w-5 unCompleteIcon' />
      )}
    </button>
  );
};

export default CompleteButton;
