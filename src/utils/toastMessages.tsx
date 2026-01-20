/* eslint-disable @typescript-eslint/no-unused-vars */
import { CircleCheckBig, Edit, Trash2, type LucideIcon } from 'lucide-react';

const TOAST_VALUES = ['ADD', 'EDIT', 'DELETE'] as const;
type ToastType = (typeof TOAST_VALUES)[number];
type ToastConfigKey = keyof typeof TOAST_CONFIG;

const TOAST_CONFIG: Record<
  ToastType,
  {
    message: (todoTitle: string) => string;
    icon: LucideIcon;
    iconClass: string;
  }
> = {
  ADD: {
    message: (todoTitle: string) => `Added: ${todoTitle}`,
    icon: CircleCheckBig,
    iconClass: 'completeIcon',
  },
  EDIT: {
    message: (todoTitle: string) => `Edited: ${todoTitle}`,
    icon: Edit,
    iconClass: 'completeIcon',
  },
  DELETE: {
    message: (todoTitle: string) => `Deleted: ${todoTitle}`,
    icon: Trash2,
    iconClass: 'text-red-400',
  },
};

export function getToastMessage(key: ToastConfigKey, todoTitle: string) {
  const msg = TOAST_CONFIG[key];
  return {
    text: msg.message(todoTitle),
    Icon: msg.icon,
    iconClass: msg.iconClass,
  };
}
