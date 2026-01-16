import {
  CircleCheckBig,
  PartyPopper,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import type { TabType } from '../constants/tabs';

type EmptyStateProps = {
  tab: TabType;
  children: React.ReactNode;
};
export const EmptyState = ({ tab, children }: EmptyStateProps) => {
  const emptyConfigs: Record<
    TabType,
    {
      icon: LucideIcon;
      title: string;
      description: string;
    }
  > = {
    All: {
      icon: Rocket,
      title: 'No todos yet.',
      description: 'Ready to get started?',
    },
    Active: {
      icon: PartyPopper,
      title: 'All caught up!',
      description: "You've cleared the list — nice work!",
    },
    Completed: {
      icon: CircleCheckBig,
      title: 'No completed todos yet.',
      description: 'Todos you mark as completed will show up here. Keep going!',
    },
  };

  const { icon: Icon, title, description } = emptyConfigs[tab];

  return (
    <div className='flex flex-col items-center justify-center gap-2 h-85 rounded-xl border-dashed border-2 '>
      <Icon className='h-15 w-15 completeIcon stroke-1' />
      <h4 className='font-semibold text-2xl tracking-wide'>{title}</h4>
      <p className='mb-5'>{description}</p>
      {children}
    </div>
  );
};
