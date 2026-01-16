import {
  CircleCheckBig,
  PartyPopper,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import type { TabType } from '../constants/tabs';

type EmptyStateProps = {
  tab: TabType;
  onAddTodo: () => void;
  onGoToActive: () => void;
};
export const EmptyState = ({
  tab,
  onAddTodo,
  onGoToActive,
}: EmptyStateProps) => {
  const emptyConfigs: Record<
    TabType,
    {
      icon: LucideIcon;
      title: string;
      description: string;
      actions: { label: string; onClick: () => void }[];
    }
  > = {
    All: {
      icon: Rocket,
      title: 'No todos yet.',
      description: 'Ready to get started?',
      actions: [{ label: 'Add new todo', onClick: onAddTodo }],
    },
    Active: {
      icon: PartyPopper,
      title: 'All caught up!',
      description: "You've cleared the list — nice work!",
      actions: [{ label: 'Add new todo', onClick: onAddTodo }],
    },
    Completed: {
      icon: CircleCheckBig,
      title: 'No completed todos yet.',
      description: 'Todos you mark as completed will show up here. Keep going!',
      actions: [
        { label: 'Add new todo', onClick: onAddTodo },
        { label: 'Go to Active todods', onClick: onGoToActive },
      ],
    },
  };

  const { icon: Icon, title, description, actions } = emptyConfigs[tab];

  return (
    <div className='flex flex-col items-center justify-center gap-2 h-65 rounded-xl border-dashed border-2 '>
      <Icon className='h-15 w-15 completeIcon stroke-1' />
      <h4 className='font-semibold text-2xl tracking-wide'>{title}</h4>
      <p>{description}</p>
      <div className='flex gap-1 items-center'>
        {actions.map((action) => (
          <button
            key={action.label}
            type='button'
            onClick={action.onClick}
            className='primaryButton'
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};
