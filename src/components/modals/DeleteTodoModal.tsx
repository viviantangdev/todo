import { Trash2 } from 'lucide-react';
import type { TodoItem } from '../../context/todosContext';
import { ModalDialog } from './ModalDialog';

type DeleteTodoModalProps = {
  onClose: () => void;
  todo: TodoItem | undefined;
  onDelete: (id: string) => void;
};

export const DeleteTodoModal = ({
  onClose,
  todo,
  onDelete,
}: DeleteTodoModalProps) => {
  return (
    <ModalDialog
      onClose={onClose}
      header={{
        title: 'Delete todo',
        headerIcon: { icon: Trash2, styling: 'text-red-500' },
      }}
      content={
        <div className='flex flex-col items-center justify-center gap-3'>
          <p> Are you sure your want to delete this todo?</p>
          <span className='italic font-semibold'>{todo!.title}</span>
        </div>
      }
      footerAction={{
        label: 'Delete',
        styling: 'deleteButton',
        onConfirm: () => onDelete(todo!.id),
      }}
    />
  );
};
