import { Edit } from 'lucide-react';
import type { TodoItem } from '../../context/todosContext';
import { ModalDialog } from './ModalDialog';

type EditTodoModalProps = {
  onClose: () => void;
  todo: TodoItem | undefined;
  onSave: (todo: TodoItem) => void;
  onChange: (title: string) => void;
};

export const EditTodoModal = ({
  onClose,
  todo,
  onSave,
  onChange,
}: EditTodoModalProps) => {
  return (
    <ModalDialog
      onClose={onClose}
      header={{
        title: 'Edit todo',
        headerIcon: { icon: Edit, styling: 'text-emerald-500' },
      }}
      content={
        <input
          placeholder='What needs to be done?'
          autoComplete='off'
          autoFocus={true}
          value={todo!.title}
          onChange={(e) => onChange(e.target.value)}
          required
          className='w-full rounded-xl bg-white dark:bg-gray-800/70 border border-gray-200/80 dark:border-gray-700/60 p-3 shadow-sm transition-smooth focus-within:shadow-md focus-within:shadow-primary/10 focus-within:border-primary/40 dark:focus-within:border-primary/50 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500'
        />
      }
      footerAction={{
        label: 'Save',
        styling: 'primaryButton',
        onConfirm: () => onSave(todo!),
      }}
    />
  );
};
